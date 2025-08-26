import RecapCard, { type RecapOverview } from '../recap-card/RecapCard'
import styles from './recap-card-list.module.scss'

interface RecapCardListProps {
  recapOverviews: RecapOverview[]
}

const RecapCardList: React.FC<RecapCardListProps> = ({ recapOverviews }) => {
  return (
    <div className={styles.latestNews}>
      {recapOverviews.map((recapOverview) => (
        <RecapCard key={recapOverview.id} recap={recapOverview} />
      ))}
    </div>
  )
}

export default RecapCardList
