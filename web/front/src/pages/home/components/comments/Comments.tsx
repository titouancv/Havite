import { useState, useMemo } from 'react'
import { useAuth } from '../../../../hooks/useAuth'
import {
  useAddComment,
  useFetchComments,
} from '../../../../services/comments.services'
import ButtonComponent from '../../../../components/button/ButtonComponent'
import styles from './comments.module.scss'
import { Link } from '@tanstack/react-router'
import { formatDate } from '../../../../utils/date'
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
    <div className={styles.commentContainer}>
      <div className={styles.comment}>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.author}>
              {comment.user?.name || 'Utilisateur inconnu'}
            </span>
            <span className={styles.date}>{formatDate(comment.createdAt)}</span>
          </div>
          <p>{comment.content}</p>
          {user && (
            <div className={styles.actions}>
              <button onClick={() => setIsReplying(!isReplying)}>
                {isReplying ? <X /> : <MessageSquareReply />}
              </button>
            </div>
          )}

          {isReplying && (
            <form className={styles.commentForm} onSubmit={handleReplySubmit}>
              <div className={styles.inputWrapper}>
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Votre réponse..."
                  disabled={isSubmitting}
                  autoFocus
                />
                <ButtonComponent
                  type="submit"
                  variant="primary"
                  disabled={!replyContent.trim() || isSubmitting}
                  content={isSubmitting ? 'Envoi...' : 'Répondre'}
                />
              </div>
            </form>
          )}
        </div>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.repliesList}>
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
    <div className={styles.commentsSection}>
      <h2>Commentaires</h2>

      {user ? (
        <form
          className={styles.commentForm}
          onSubmit={handleSubmit}
          style={{ marginBottom: '12px' }}
        >
          <div className={styles.inputWrapper}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              disabled={addCommentMutation.isPending}
            />
            <ButtonComponent
              type="submit"
              variant="primary"
              disabled={!newComment.trim() || addCommentMutation.isPending}
              content={addCommentMutation.isPending ? 'Envoi...' : 'Publier'}
            />
          </div>
        </form>
      ) : (
        <div className={styles.loginPrompt}>
          <p>
            <Link to="/login">Connectez-vous</Link> pour participer à la
            discussion.
          </p>
        </div>
      )}

      <div className={styles.commentsList}>
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
