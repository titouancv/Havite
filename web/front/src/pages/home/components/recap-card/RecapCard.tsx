import { useContext } from 'react'
import styles from './recap-card.module.scss'
import { ModalContext } from '../../contexts/ModalContext'

type RecapCardProps = {
  title: string
}

function RecapCard({ title }: RecapCardProps) {
  const context = useContext(ModalContext)

  if (!context) {
    return null
  }
  const { setIsModalOpen, setModalTitle } = context

  const handleClick = () => {
    setIsModalOpen(true)
    setModalTitle(title)
  }

  return (
    <div className={styles.recapCard} onClick={handleClick}>
      <p>{title}</p>
    </div>
  )
}

export default RecapCard
