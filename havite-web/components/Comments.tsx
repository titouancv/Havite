import { useState, useMemo, useEffect, useCallback } from "react";
import { MessageSquare, X, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { formatDate } from "@/lib/date";
import Button from "./ui/Button";
import { addComment, fetchComments } from "@/api/comments";
import { Comment } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CommentsProps {
  recapId: string;
}

interface CommentItemProps {
  comment: Comment;
  recapId: string;
  onReply: (parentId: string, content: string) => Promise<void>;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  recapId,
  onReply,
}) => {
  const { user } = useAuth();
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      await onReply(comment.id, replyContent);
      setReplyContent("");
      setIsReplying(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasReplies = comment.replies && comment.replies.length > 0;

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-2 relative">
        <div className="size-6 rounded-full bg-gray-200 overflow-hidden relative flex-shrink-0">
          {comment.user?.avatarUrl ? (
            <img
              src={comment.user.avatarUrl}
              alt={comment.user.name}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600 text-white font-bold text-sm">
              {comment.user?.name?.substring(0, 2).toUpperCase() || "??"}
            </div>
          )}
        </div>
        {/* Content Section */}
        <div className="flex-1 pb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-gray-900 text-sm">
              {comment.user?.name || "Utilisateur inconnu"}
            </span>
            <span className="text-xs text-gray-500">
              {formatDate(comment.createdAt)}
            </span>
          </div>

          <p className="text-gray-800 text-[0.95rem] leading-relaxed whitespace-pre-wrap mb-3">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4 text-gray-500">
            {user &&
              !comment.parentId &&
              (isReplying ? (
                <Button
                  variant="transparent"
                  size="small"
                  onClick={() => setIsReplying(!isReplying)}
                >
                  <X size={16} />
                  <span>Cancel</span>
                </Button>
              ) : (
                <Button
                  variant="transparent"
                  size="small"
                  onClick={() => setIsReplying(!isReplying)}
                >
                  <MessageSquare size={16} />
                  <span>Reply</span>
                </Button>
              ))}
            {hasReplies && (
              <Button
                variant="transparent"
                size="small"
                onClick={() => setShowReplies(!showReplies)}
              >
                {showReplies ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
                <span>
                  {showReplies ? "Hide" : "Show"} {comment.replies!.length}{" "}
                  {comment.replies!.length === 1 ? "reply" : "replies"}
                </span>
              </Button>
            )}
          </div>

          {/* Reply Input */}
          {isReplying && (
            <div className="mt-4">
              <form onSubmit={handleReplySubmit} className="flex gap-3 px-2">
                <div className="size-6 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden relative">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-400 text-white text-xs">
                      {user?.name?.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-md p-3 focus-within:ring-2 focus-within:ring-primary-200 transition-all">
                    <textarea
                      className="w-full bg-transparent border-none outline-none text-sm resize-none min-h-[60px]"
                      placeholder="Write a reply..."
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      autoFocus
                    />
                    <div className="flex justify-end mt-2">
                      <Button
                        type="submit"
                        variant="transparent"
                        disabled={!replyContent.trim() || isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Reply"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Replies List */}
      {hasReplies && showReplies && (
        <div className="flex flex-col">
          {comment.replies!.map((reply, index) => (
            <div key={reply.id} className="flex relative">
              {/* Connector Lines */}
              <div className="w-[40px] flex-shrink-0 flex justify-center relative">
                {/* Vertical line from parent */}
                <div
                  className={`w-[2px] bg-gray-200 absolute top-0 left-2 ${
                    index === comment.replies!.length - 1
                      ? "h-[24px]"
                      : "h-full"
                  }`}
                />
                {/* Curved line to child */}
                <div className="absolute top-[24px] left-2 w-[20px] h-[20px] border-b-[2px] border-l-[2px] border-gray-200 rounded-bl-xl" />
              </div>

              {/* Reply Item */}
              <div className="flex-1">
                <CommentItem
                  comment={reply}
                  recapId={recapId}
                  onReply={onReply}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Comments: React.FC<CommentsProps> = ({ recapId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [newComment, setNewComment] = useState("");

  const router = useRouter();

  const loadComments = useCallback(async () => {
    if (!recapId) return;
    setIsLoading(true);
    try {
      const data = await fetchComments(recapId);
      setComments(data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setIsLoading(false);
    }
  }, [recapId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const commentTree = useMemo(() => {
    if (!comments) return [];
    const map = new Map<string, Comment>();
    const roots: Comment[] = [];

    // Initialize map with comments and empty replies array
    comments.forEach((c) => {
      map.set(c.id, { ...c, replies: [] });
    });

    // Build tree
    comments.forEach((c) => {
      const comment = map.get(c.id)!;
      if (c.parentId && map.has(c.parentId)) {
        map.get(c.parentId)!.replies!.push(comment);
      } else {
        roots.push(comment);
      }
    });

    // Sort by date (oldest first for replies usually, but let's keep newest first for roots if desired, or oldest first for conversation flow)
    // Let's keep the order from the query (newest first) for roots, and maybe reverse for replies?
    // Actually, usually comments are newest first, replies are oldest first.
    // The query returns newest first.
    // Sort replies oldest first
    const sortReplies = (nodes: Comment[]) => {
      nodes.forEach((node) => {
        if (node.replies && node.replies.length > 0) {
          node.replies.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          sortReplies(node.replies);
        }
      });
    };
    sortReplies(roots);
    return roots;
  }, [comments]);

  const handleAddComment = async (content: string, parentId?: string) => {
    if (!user || !content.trim() || !recapId) return;

    setIsPending(true);
    try {
      await addComment({
        recapId,
        content,
        userId: user.id,
        parentId,
      });
      await loadComments(); // Recharger les commentaires après ajout
    } catch (error) {
      console.error("Failed to add comment:", error);
      throw error;
    } finally {
      setIsPending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleAddComment(newComment);
    setNewComment("");
  };

  if (isLoading) {
    return (
      <div className="py-8 text-center text-gray-500">
        Chargement des commentaires...
      </div>
    );
  }

  return (
    <div id="comments" className="pt-8 w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-gray-900">Comments</h2>
          <span className="bg-primary-300 text-white text-xs font-bold px-2 py-1 rounded-full">
            {comments.length}
          </span>
        </div>
      </div>

      {/* Input Area */}
      {user ? (
        <div className="bg-gray-100 rounded-md p-4 mb-10 border border-gray-200">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full min-h-[80px] bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 resize-none font-medium"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add comment..."
              disabled={isPending}
            />

            <div className="flex items-center justify-end mt-4 pt-3 border-t border-gray-200">
              <Button
                type="submit"
                variant="transparent"
                disabled={!newComment.trim() || isPending}
              >
                {isPending ? "Sending..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mb-10 p-6 bg-gray-100 rounded-md text-center border border-gray-200">
          <p className="text-gray-600">
            <Button variant="primary" onClick={() => router.push("/login")}>
              Log in to join the discussion
            </Button>
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="flex flex-col gap-2">
        {commentTree.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            recapId={recapId}
            onReply={(parentId, content) => handleAddComment(content, parentId)}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
