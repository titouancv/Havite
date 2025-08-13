import styles from './recap-card.module.scss'

type RecapCardProps = {
  title: string
}

function RecapCard({ title }: RecapCardProps) {
  return (
    <div className={styles.recapCard}>
      <p>{title}</p>
    </div>
  )
}

export default RecapCard
