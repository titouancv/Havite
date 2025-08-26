import type { RecapOverview } from '../pages/home/components/recap-card/RecapCard'
import type { Recap } from '../pages/home/components/recap-view/RecapView'
import { useTRPC } from '../utils/trpc'
import { useQuery } from '@tanstack/react-query'

export function FetchRecapById(recapOverviewId: string): Recap {
  const trpc = useTRPC()
  const { data: recap, isLoading } = useQuery(trpc.recap.byId.queryOptions(recapOverviewId))
  if (isLoading) return { id: '', title: 'Loading...', content: '', sources: [] }
  if (!recap) return { id: '', title: 'No data', content: '', sources: [] }
  return recap as Recap
}

export function FetchAllRecapsOverview(): RecapOverview[] {
  const trpc = useTRPC()
  const { data: recapOverviews = [] } = useQuery(trpc.recap.allOverview.queryOptions())
  return recapOverviews as RecapOverview[]
}
