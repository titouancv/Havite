import RecapCard, { type RecapOverview } from '../recap-card/RecapCard'
import styles from './latest-recap.module.scss'

interface LatestRecapProps {
  recapOverviews: RecapOverview[]
}

const LatestRecap: React.FC<LatestRecapProps> = ({ recapOverviews }) => {
  return (
    <div className={styles.latestNews}>
      {recapOverviews.map((recapOverview) => (
        <RecapCard key={recapOverview.id} recap={recapOverview} />
      ))}
    </div>
  )
}

export default LatestRecap
