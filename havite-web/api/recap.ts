import { supabase, type DBRecap } from "@/lib/supabase";
import { MOCK_RECAPS_DATA, MOCK_RECAPS_OVERVIEW } from "@/mocks/data";
import { Article, Recap, RecapOverview } from "@/types";

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

/* ------------------------- Fetch recap by ID ------------------------- */

export async function fetchRecapById(recapId: string): Promise<Recap> {
  if (USE_MOCK_DATA) {
    const mockRecap = MOCK_RECAPS_DATA.find((r) => r.id === recapId);
    if (!mockRecap) throw new Error("Recap not found (mock)");
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockRecap;
  }

  const { data, error } = await supabase
    .from("recap")
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
    .eq("id", recapId)
    .maybeSingle();

  if (error || !data) {
    if (error) {
      console.error("Error fetching recap:", error);
    } else {
      console.error("Recap not found for recapId:", recapId);
    }
    return {
      id: recapId,
      upVotes: 0,
      downVotes: 0,
      article: {
        id: "",
        title: "Erreur de chargement",
        summary: "Impossible de charger le contenu.",
        content: "Impossible de charger le contenu.",
        imageUrl: "",
        category: "",
        readingTime: 0,
        createdAt: 0,
      },
      sources: [],
    };
  }

  const r = data as unknown as DBRecap;

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
  }));

  const recap = {
    id: r.id,
    upVotes: r.up_votes ?? 0,
    downVotes: r.down_votes ?? 0,
    article: {
      id: r.article?.id || "",
      title: r.article?.title || "",
      summary: r.article?.summary || "",
      content: r.article?.content || "",
      imageUrl: r.article?.image_url || "",
      category: r.article?.category || "",
      readingTime: r.article?.reading_time || 0,
      createdAt: r.article?.created_at || 0,
    } as Article,
    sources,
  } as Recap;

  return recap;
}

/* ------------------------- Fetch Recaps Overview ------------------------- */

type FetchRecapsResult = {
  items: RecapOverview[];
  nextCursor?: number;
};

export async function fetchAllRecapsOverview(
  pageParam?: string,
  limit = 10
): Promise<FetchRecapsResult> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      items: MOCK_RECAPS_OVERVIEW,
      nextCursor: undefined,
    };
  }

  let query = supabase
    .from("article")
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
    .order("created_at", { ascending: false })
    .limit(limit + 1);

  if (pageParam) {
    query = query.lt("created_at", pageParam);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const hasNextPage = data.length > limit;
  const items = hasNextPage ? data.slice(0, limit) : data;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mappedItems: RecapOverview[] = items.map((row: any) => {
    const recapData = Array.isArray(row.recap) ? row.recap[0] : row.recap;

    return {
      id: recapData?.id || "",
      articleId: row.id,
      title: row.title,
      summary: row.summary,
      imageUrl: row.image_url,
      category: row.category,
      createdAt: row.created_at,
      upVotes: recapData?.up_votes ?? 0,
      downVotes: recapData?.down_votes ?? 0,
    };
  });

  const nextCursor =
    mappedItems.length > 0
      ? mappedItems[mappedItems.length - 1].createdAt
      : undefined;

  return {
    items: mappedItems,
    nextCursor,
  };
}
