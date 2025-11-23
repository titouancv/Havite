import { useContext, useEffect, useState } from 'react'
import {
  Cpu,
  TrendingUp,
  HardDrive,
  ShieldCheck,
  Car,
  Newspaper,
  type LucideIcon,
} from 'lucide-react'
import styles from './recap-card.module.scss'
import { ModalContext } from '../../contexts/ModalContext'
import type { RecapOverview } from '@/types'

type RecapCardProps = {
  recap: RecapOverview
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Technologie: Cpu,
  Finance: TrendingUp,
  Hardware: HardDrive,
  Sécurité: ShieldCheck,
  Transport: Car,
}

export const testImageURL = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true) // L'image s'est chargée correctement
    img.onerror = () => resolve(false) // L'image n'existe pas ou l'URL est invalide
    img.src = url
  })
}

function RecapCard({ recap }: RecapCardProps) {
  const context = useContext(ModalContext)
  const [isImageValid, setIsImageValid] = useState(false)

  useEffect(() => {
    testImageURL(recap.imageUrl).then((isValid) => {
      setIsImageValid(isValid)
    })
  }, [recap.imageUrl])

  if (!context) {
    return null
  }
  const { setIsModalOpen, setModalRecapOverview } = context

  const handleClick = () => {
    setIsModalOpen(true)
    setModalRecapOverview({
      id: recap.id,
      title: recap.title,
      content: recap.content,
      imageUrl: '',
      category: recap.category,
      createdAt: recap.createdAt,
    })
  }

  const Icon = CATEGORY_ICONS[recap.category] || Newspaper

  return (
    <button
      className={styles.recapCard}
      onClick={handleClick}
      type="button"
      aria-label={`Voir le récapitulatif : ${recap.title}`}
    >
      <div className={styles.avatarColumn}>
        <div className={styles.avatar}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
      </div>
      <div className={styles.contentColumn}>
        <div className={styles.header}>
          <span className={styles.categoryName}>{recap.category}</span>
          <span className={styles.dot}>·</span>
          <span className={styles.time}>
            {new Date(recap.createdAt).toLocaleDateString() +
              ' ' +
              new Date(recap.createdAt).toLocaleTimeString()}
          </span>
        </div>
        <div className={styles.body}>
          <p className={styles.text}>{recap.content}</p>
          {isImageValid && (
            <div className={styles.imageContainer}>
              <img src={recap.imageUrl} alt="" className={styles.image} />
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

export default RecapCard
