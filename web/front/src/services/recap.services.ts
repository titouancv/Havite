import type { Recap, RecapOverview } from '@/types'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { supabase, type DBRecap } from '../utils/supabase'
import { MOCK_RECAPS_DATA, MOCK_RECAPS_OVERVIEW } from '../mocks/data'

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true'

/* ------------------------- Fetch recap by ID ------------------------- */

export function useFetchRecapByArticleId(articleId: string): Recap {
  const {
    data: recap,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['recap.byArticleId', articleId],
    enabled: !!articleId && articleId !== '',
    queryFn: async () => {
      if (USE_MOCK_DATA) {
        const mockRecap = MOCK_RECAPS_DATA.find((r) => r.article.id === articleId)
        if (!mockRecap) throw new Error('Recap not found (mock)')
        await new Promise((resolve) => setTimeout(resolve, 500))
        return mockRecap
      }

      const { data, error } = await supabase
        .from('recap')
        .select(
          `
          id,
          up_votes,
          down_votes,
          article:article_id (
            id,
            title,
            summary,
            content,
            image_url,
            category,
            reading_time,
            created_at
          ),
          sources (
            id,
            url,
            media:media_id (
              id,
              name,
              url,
              logo_url
            )
          )
        `
        )
        .eq('article_id', articleId)
        .maybeSingle()

      if (error) throw error
      if (!data) throw new Error('Recap not found for this article')

      const r = data as unknown as DBRecap

      const sources = (r.sources || []).map((s) => ({
        id: s.id,
        url: s.url,
        media: s.media
          ? {
              id: s.media.id,
              name: s.media.name,
              url: s.media.url,
              logoUrl: s.media.logo_url,
            }
          : null,
      }))

      return {
        id: r.id,
        upVotes: r.up_votes ?? 0,
        downVotes: r.down_votes ?? 0,
        article: {
          id: r.article?.id || '',
          title: r.article?.title || '',
          summary: r.article?.summary || '',
          content: r.article?.content || '',
          imageUrl: r.article?.image_url || '',
          category: r.article?.category || '',
          readingTime: r.article?.reading_time || 0,
          createdAt: r.article?.created_at || 0,
        },
        sources,
      } as Recap
    },
  })

  if (isLoading)
    return {
      id: '',
      upVotes: 0,
      downVotes: 0,
      article: {
        id: '',
        title: 'Loading...',
        summary: '',
        content: 'Loading...',
        imageUrl: '',
        category: '',
        readingTime: 0,
        createdAt: 0,
      },
      sources: [],
    }

  if (isError || !recap)
    return {
      id: articleId,
      upVotes: 0,
      downVotes: 0,
      article: {
        id: articleId,
        title: 'Erreur de chargement',
        summary: 'Impossible de charger le contenu.',
        content: 'Impossible de charger le contenu.',
        imageUrl: '',
        category: '',
        readingTime: 0,
        createdAt: 0,
      },
      sources: [],
    }

  return recap
}

/* ------------------------- Fetch Recaps Overview ------------------------- */

export function useFetchAllRecapsOverview() {
  return useInfiniteQuery({
    queryKey: ['recap.allOverview'],
    queryFn: async ({ pageParam }: { pageParam: number | undefined }) => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 500))
        return {
          items: MOCK_RECAPS_OVERVIEW,
          nextCursor: undefined,
        }
      }

      const limit = 10

      let query = supabase
        .from('article')
        .select(
          `
            *,
            recap!inner (
              id,
              up_votes,
              down_votes
            )
          `
        )
        .order('created_at', { ascending: false })
        .limit(limit + 1)

      if (pageParam) {
        query = query.lt('created_at', pageParam)
      }

      const { data, error } = await query
      if (error) throw error

      const hasNextPage = data.length > limit
      const items = hasNextPage ? data.slice(0, limit) : data

      const mappedItems: RecapOverview[] = items.map((row) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const r = row as any
        const recapData = Array.isArray(r.recap) ? r.recap[0] : r.recap

        return {
          id: recapData?.id || '',
          articleId: r.id,
          title: r.title,
          summary: r.summary,
          imageUrl: r.image_url,
          category: r.category,
          createdAt: r.created_at,
          upVotes: recapData?.up_votes ?? 0,
          downVotes: recapData?.down_votes ?? 0,
        }
      })

      const nextCursor =
        mappedItems.length > 0 ? mappedItems[mappedItems.length - 1].createdAt : undefined

      return {
        items: mappedItems,
        nextCursor,
      }
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })
}
