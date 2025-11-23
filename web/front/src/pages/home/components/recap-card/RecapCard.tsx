import { useContext } from 'react'
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

export interface RecapOverview {
  id: string
  title: string
  content: string
  imageUrl: string
  category: string
  readingTime: number
}

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

function RecapCard({ recap }: RecapCardProps) {
  const context = useContext(ModalContext)

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
      readingTime: recap.readingTime,
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
          <span className={styles.time}>{recap.readingTime} min</span>
        </div>
        <div className={styles.body}>
          <p className={styles.text}>{recap.content}</p>
          {recap.imageUrl && (
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
