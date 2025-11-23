import type { Recap, RecapOverview } from '@/types'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { supabase, type DBArticle, type DBRecap } from '../utils/supabase'
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

      // Requête unique avec LEFT JOIN implicite sur sources et media
      const { data, error } = await supabase
        .from('recap')
        .select(
          `
          id,
          article:article_id (
            id,
            title,
            content_recap,
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

      if (error) {
        throw error
      }
      if (!data) throw new Error('Recap not found for this article')

      const r = data as unknown as DBRecap

      // Mapping sécurisé des sources et media
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
        article: {
          id: r.article?.id || '',
          title: r.article?.title || '',
          contentRecap: r.article?.content_recap || '',
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

  // Loading fallback
  if (isLoading)
    return {
      id: '',
      article: {
        id: '',
        title: 'Loading...',
        contentRecap: '',
        content: 'Loading...',
        imageUrl: '',
        category: '',
        readingTime: 0,
        createdAt: 0,
      },
      sources: [],
    }

  // Error fallback
  if (isError || !recap)
    return {
      id: articleId,
      article: {
        id: articleId,
        title: 'Erreur de chargement',
        contentRecap: 'Impossible de charger le contenu.',
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

      // Query 'article' directly to allow sorting by 'created_at'
      // Use !inner join on 'recap' to only get articles that have a recap
      let query = supabase
        .from('article')
        .select(
          `
            *,
            recap!inner (
              id
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
        const r = row as DBArticle & { recap: { id: string }[] }
        return {
          id: r.id,
          title: r.title,
          content: r.content_recap,
          imageUrl: r.image_url,
          category: r.category,
          createdAt: r.created_at,
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
