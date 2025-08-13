import RecapCard from '../recap-card/RecapCard'
import styles from './latest-recap.module.scss'

function LatestRecap() {
  const recapTitles = [
    'Festival de Cannes: statistiquement, quel est le portrait-robot du lauréat de la Palme d or?',
    'Recap 2',
    'Recap 3',
    'Recap 4',
    'Recap 5',
  ]
  return (
    <div className={styles.latestNews}>
      {recapTitles.map((title) => (
        <RecapCard key={title} title={title} />
      ))}
    </div>
  )
}

export default LatestRecap
