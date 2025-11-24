import { useContext, useEffect, useState } from 'react'
import { Newspaper, SquareArrowDown, SquareArrowUp } from 'lucide-react'
import styles from './recap-card.module.scss'
import { ModalContext } from '../../contexts/ModalContext'
import { CATEGORIES, type RecapOverview } from '@/types'
import { formatDate } from '@/utils/date'
import { useAuth } from '@/hooks/useAuth'
import { useRecapVote } from '@/hooks/useRecapVote'
import { useRouter } from '@tanstack/react-router'
import Button from '@/components/button/Button'

// Map categories to icons

type RecapCardProps = {
  recap: RecapOverview
}

export const testImageURL = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = url
  })
}

function RecapCard({ recap }: RecapCardProps) {
  const context = useContext(ModalContext)
  const [isImageValid, setIsImageValid] = useState(false)
  const { user } = useAuth()

  const { upVotes, downVotes, userVote, toggleUpvote, toggleDownvote } = useRecapVote(
    recap.id,
    user?.id
  )

  const router = useRouter()

  const goLogin = () => {
    router.navigate({ to: '/login' })
  }

  useEffect(() => {
    testImageURL(recap.imageUrl).then(setIsImageValid)
  }, [recap.imageUrl])

  if (!context) return null

  const { setIsModalOpen, setModalRecapOverview } = context

  const handleClick = () => {
    setIsModalOpen(true)
    setModalRecapOverview({
      ...recap,
    })
  }

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) {
      goLogin()
    }
    if (!recap.id) {
      console.error('Recap ID is missing')
      return
    }
    toggleUpvote()
  }

  const handleDownvote = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!user) {
      alert('Veuillez vous connecter pour voter')
      return
    }
    if (!recap.id) {
      console.error('Recap ID is missing')
      return
    }
    toggleDownvote()
  }

  const Icon = CATEGORIES[recap.category]?.icon || Newspaper
  const categoryName = CATEGORIES[recap.category]?.label || 'Actualité'
  const categoryColor = CATEGORIES[recap.category]?.color || '#BFDBFE'

  return (
    <div
      className={styles.recapCard}
      onClick={handleClick}
      aria-label={`Voir le récapitulatif : ${recap.title}`}
    >
      <div className={styles.avatarColumn}>
        <div
          className={styles.avatar}
          style={{
            backgroundColor: categoryColor,
            borderColor: categoryColor,
            color: '#1f2937', // Dark gray for readability on pastel
          }}
        >
          <Icon size={20} strokeWidth={2.5} />
        </div>
      </div>

      <div className={styles.contentColumn}>
        <div className={styles.header}>
          <span className={styles.categoryName}>{categoryName}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.time}>{formatDate(new Date(recap.createdAt))}</span>
        </div>

        <div className={styles.body}>
          <p className={styles.text}>{recap.content}</p>
          {isImageValid && (
            <div className={styles.imageContainer}>
              <img src={recap.imageUrl} alt="" className={styles.image} />
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <Button
            className={`${styles.actionButton} ${userVote === 1 ? styles.activeUp : ''}`}
            onClick={handleUpvote}
            type="button"
          >
            <SquareArrowUp size={16} className={userVote === 1 ? styles.filledIcon : ''} />
            <span className={styles.voteCount}>{upVotes}</span>
          </Button>
          <Button
            className={`${styles.actionButton} ${userVote === -1 ? styles.activeDown : ''}`}
            onClick={handleDownvote}
            type="button"
          >
            <SquareArrowDown size={16} className={userVote === -1 ? styles.filledIcon : ''} />
            <span className={styles.voteCount}>{downVotes}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RecapCard
