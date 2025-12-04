import { useState, useMemo } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import {
  useAddComment,
  useFetchComments,
} from '../../../services/comments.services'
import Button from '../../../components/Button'
import { Link } from '@tanstack/react-router'
import { formatDate } from '../../../utils/date'
import type { Comment } from '@/types'
import { MessageSquareReply, X } from 'lucide-react'

interface CommentsProps {
  recapId: string
}

interface CommentItemProps {
  comment: Comment
  recapId: string
  onReply: (parentId: string, content: string) => Promise<void>
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  recapId,
  onReply,
}) => {
  const { user } = useAuth()
  const [isReplying, setIsReplying] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyContent.trim()) return

    setIsSubmitting(true)
    try {
      await onReply(comment.id, replyContent)
      setReplyContent('')
      setIsReplying(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex-1 bg-gray-200 p-2 rounded-lg">
          <div className="flex justify-between mb-1">
            <span className="font-semibold text-sm">
              {comment.user?.name || 'Utilisateur inconnu'}
            </span>
            <span className="text-xs text-gray-600">
              {formatDate(comment.createdAt)}
            </span>
          </div>
          <p className="m-0 text-[0.95rem] leading-snug whitespace-pre-wrap">
            {comment.content}
          </p>
          {user && (
            <div className="mt-1 flex justify-end gap-2">
              <button
                className="bg-transparent border-none text-gray-600 text-xs cursor-pointer p-0 hover:text-primary-300 hover:underline"
                onClick={() => setIsReplying(!isReplying)}
              >
                {isReplying ? <X /> : <MessageSquareReply />}
              </button>
            </div>
          )}

          {isReplying && (
            <form className="flex gap-2" onSubmit={handleReplySubmit}>
              <div className="flex-1 flex flex-col gap-1 border border-gray-400 rounded-lg p-2">
                <textarea
                  className="w-full min-h-[80px] p-2 resize-y font-inherit text-gray-800 focus:outline-none focus:border-primary-300"
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Votre réponse..."
                  disabled={isSubmitting}
                  autoFocus
                />
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!replyContent.trim() || isSubmitting}
                >
                  {isSubmitting ? 'Envoi...' : 'Répondre'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 flex flex-col gap-2 border-l-2 border-gray-300 pl-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              recapId={recapId}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const Comments: React.FC<CommentsProps> = ({ recapId }) => {
  const { user } = useAuth()
  const { data: comments, isLoading } = useFetchComments(recapId)
  const addCommentMutation = useAddComment()
  const [newComment, setNewComment] = useState('')

  const commentTree = useMemo(() => {
    if (!comments) return []
    const map = new Map<string, Comment>()
    const roots: Comment[] = []

    // Initialize map with comments and empty replies array
    comments.forEach((c) => {
      map.set(c.id, { ...c, replies: [] })
    })

    // Build tree
    comments.forEach((c) => {
      const comment = map.get(c.id)!
      if (c.parentId && map.has(c.parentId)) {
        map.get(c.parentId)!.replies!.push(comment)
      } else {
        roots.push(comment)
      }
    })

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
          )
          sortReplies(node.replies)
        }
      })
    }
    sortReplies(roots)
    return roots
  }, [comments])

  const handleAddComment = async (content: string, parentId?: string) => {
    if (!user || !content.trim() || !recapId) return

    try {
      await addCommentMutation.mutateAsync({
        recapId,
        content,
        userId: user.id,
        parentId,
      })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to add comment:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleAddComment(newComment)
    setNewComment('')
  }

  if (isLoading) {
    return <div>Chargement des commentaires...</div>
  }

  return (
    <div className="pt-6 w-full">
      <h2 className="mb-4 font-bold">Commentaires</h2>

      {user ? (
        <form className="flex gap-2 mb-3" onSubmit={handleSubmit}>
          <div className="flex-1 flex flex-col gap-1 border border-gray-400 rounded-lg p-2">
            <textarea
              className="w-full min-h-[80px] p-2 resize-y font-inherit text-gray-800 focus:outline-none focus:border-primary-300"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              disabled={addCommentMutation.isPending}
            />
            <Button
              type="submit"
              variant="primary"
              disabled={!newComment.trim() || addCommentMutation.isPending}
            >
              {addCommentMutation.isPending ? 'Envoi...' : 'Publier'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="mb-6 p-4 bg-gray-200 rounded-lg text-center">
          <p>
            <Link
              to="/login"
              className="text-primary-300 underline cursor-pointer"
            >
              Connectez-vous
            </Link>{' '}
            pour participer à la discussion.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4">
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
  )
}

export default Comments
