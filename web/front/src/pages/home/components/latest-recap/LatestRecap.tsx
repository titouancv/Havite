import RecapCard from '../recap-card/RecapCard'
import styles from './latest-recap.module.scss'

interface LatestRecapProps {
  recapTitles: string[]
}

const LatestRecap: React.FC<LatestRecapProps> = ({ recapTitles }) => {
  return (
    <div className={styles.latestNews}>
      {recapTitles.map((title) => (
        <RecapCard key={title} title={title} />
      ))}
    </div>
  )
}

export default LatestRecap
