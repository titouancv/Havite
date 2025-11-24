import { SquareArrowDown, SquareArrowUp } from 'lucide-react'
import styles from './social.module.scss'
import { useAuth } from '@/hooks/useAuth'
import { useRecapVote } from '@/hooks/useRecapVote'
import { useRouter } from '@tanstack/react-router'
import Button from '@/components/button/Button'

// Map categories to icons

type RecapCardProps = {
  recapId: string
}

function Social({ recapId }: RecapCardProps) {
  const { user } = useAuth()

  const { upVotes, downVotes, userVote, toggleUpvote, toggleDownvote } = useRecapVote(
    recapId,
    user?.id
  )

  const router = useRouter()

  const goLogin = () => {
    router.navigate({ to: '/login' })
  }

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) {
      goLogin()
    }
    if (!recapId) {
      console.error('Recap ID is missing')
      return
    }
    toggleUpvote()
  }

  const handleDownvote = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) {
      goLogin()
    }
    if (!recapId) {
      console.error('Recap ID is missing')
      return
    }
    toggleDownvote()
  }

  return (
    <div className={styles.social}>
      <Button
        className={`${styles.actionButton} ${userVote === 1 ? styles.active : ''}`}
        onClick={handleUpvote}
        type="button"
      >
        <SquareArrowUp size={16} className={userVote === 1 ? styles.filledIcon : ''} />
        <span className={styles.voteCount}>{upVotes}</span>
      </Button>
      <Button
        className={`${styles.actionButton} ${userVote === -1 ? styles.active : ''}`}
        onClick={handleDownvote}
        type="button"
      >
        <SquareArrowDown size={16} className={userVote === -1 ? styles.filledIcon : ''} />
        <span className={styles.voteCount}>{downVotes}</span>
      </Button>
    </div>
  )
}

export default Social
