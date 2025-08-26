import { useContext } from 'react'
import styles from './recap-card.module.scss'
import { ModalContext } from '../../contexts/ModalContext'

export interface RecapOverview {
  id: string
  title: string
}

type RecapCardProps = {
  recap: RecapOverview
}

function RecapCard({ recap }: RecapCardProps) {
  const context = useContext(ModalContext)

  if (!context) {
    return null
  }
  const { setIsModalOpen, setModalRecapOverview } = context

  const handleClick = () => {
    setIsModalOpen(true)
    setModalRecapOverview({ id: recap.id, title: recap.title })
  }

  return (
    <div className={styles.recapCard} onClick={handleClick}>
      <p>{recap.title}</p>
    </div>
  )
}

export default RecapCard
