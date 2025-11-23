import type { Recap } from '../pages/home/components/recap-view/RecapView'
import { useTRPC, useTRPCClient } from '../utils/trpc'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'

import { MOCK_RECAPS_OVERVIEW, MOCK_RECAP_DETAILS } from '../mocks/data'

export function useFetchRecapById(recapOverviewId: string): Recap {
  const trpc = useTRPC()
  const {
    data: recap,
    isLoading,
    isError,
  } = useQuery({
    ...trpc.recap.byId.queryOptions(recapOverviewId),
    retry: 1,
    retryDelay: 500,
  })

  if (isLoading)
    return {
      id: '',
      title: 'Loading...',
      content: '',
      imageUrl: '',
      category: '',
      readingTime: 0,
      relatedQuestions: [],
      sources: [],
    }

  if (isError || !recap) {
    return (
      MOCK_RECAP_DETAILS[recapOverviewId] || {
        id: recapOverviewId,
        title: 'Erreur de chargement',
        content: 'Impossible de charger le contenu.',
        imageUrl: '',
        category: '',
        readingTime: 0,
        relatedQuestions: [],
        sources: [],
      }
    )
  }
  return recap as Recap
}

export function useFetchAllRecapsOverview() {
  const client = useTRPCClient()
  return useInfiniteQuery({
    queryKey: ['recap.allOverview'],
    queryFn: async ({ pageParam }) => {
      try {
        return await client.recap.allOverview.query({
          limit: 10,
          cursor: pageParam as string | undefined,
        })
      } catch (error) {
        console.warn('Failed to fetch recaps overview, returning mock data', error)
        // Mock pagination fallback
        const limit = 10
        const allMocks = MOCK_RECAPS_OVERVIEW
        let startIndex = 0
        if (pageParam) {
          const cursorIndex = allMocks.findIndex((m) => m.id === pageParam)
          if (cursorIndex !== -1) {
            startIndex = cursorIndex + 1
          }
        }
        const slicedMocks = allMocks.slice(startIndex, startIndex + limit + 1)
        let nextCursor: string | undefined = undefined

        if (slicedMocks.length > limit) {
          const nextItem = slicedMocks.pop()
          nextCursor = nextItem!.id
        }
        return {
          items: slicedMocks,
          nextCursor,
        }
      }
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    retry: 1,
    retryDelay: 500,
  })
}
