import { useEffect, useRef } from 'react'
import type { RecapOverview } from '@/types'
import RecapCard from './RecapCard'

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
    <div className="flex flex-col items-center justify-start w-full flex-1 overflow-y-auto pb-4">
      {recapOverviews.map((recapOverview) => (
        <RecapCard key={recapOverview.id} recap={recapOverview} />
      ))}
      <div
        ref={observerTarget}
        className="w-full text-center p-4 text-gray-800 min-h-5"
      >
        {isFetchingNextPage && <p>Chargement...</p>}
      </div>
    </div>
  )
}

export default RecapCardList
