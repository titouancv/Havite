import { useContext, useEffect, useState } from 'react'
import { Newspaper } from 'lucide-react'
import styles from './recap-card.module.scss'
import { ModalContext } from '../../contexts/ModalContext'
import { CATEGORIES, type RecapOverview } from '@/types'
import { formatDate } from '@/utils/date'
import Social from '../social/Social'

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
          <p className={styles.text}>{recap.summary}</p>
          {isImageValid && (
            <div className={styles.imageContainer}>
              <img src={recap.imageUrl} alt="" className={styles.image} />
            </div>
          )}
        </div>

        <Social recapId={recap.id} />
      </div>
    </div>
  )
}

export default RecapCard
