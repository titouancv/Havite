import { useEffect, useRef } from 'react'
import RecapCard, { type RecapOverview } from '../recap-card/RecapCard'
import styles from './recap-card-list.module.scss'

interface RecapCardListProps {
  recapOverviews: RecapOverview[]
  fetchNextPage: () => void
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

const RecapCardList: React.FC<RecapCardListProps> = ({
  recapOverviews,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}) => {
  const observerTarget = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1.0 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [fetchNextPage, hasNextPage])

  return (
    <div className={styles.latestNews}>
      {recapOverviews.map((recapOverview) => (
        <RecapCard key={recapOverview.id} recap={recapOverview} />
      ))}
      <div ref={observerTarget} className={styles.loadingTrigger}>
        {isFetchingNextPage && <p>Chargement...</p>}
      </div>
    </div>
  )
}

export default RecapCardList
