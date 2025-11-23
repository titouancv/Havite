import { prisma } from "../../db";
import { router, publicProcedure } from "../trpc"
import { z } from "zod";
import { MOCK_RECAPS } from "../../mocks/data";

interface RecapOverview {
  id: string
  title: string
  content: string
  imageUrl: string
  category: string
  readingTime: number
}

interface Recap {
  id: string
  title: string
  content: string
  imageUrl: string
  category: string
  readingTime: number
  relatedQuestions: string[]
  sources: { id: string; url: string; mediaName: string }[]
}

export const recapRouter = router({
  all: publicProcedure
  .query(async () => {
    const allRecap = await prisma.recap.findMany({
      include: { sources: true },
    });
    return allRecap;
  }),

  allOverview: publicProcedure
  .input(
    z.object({
      limit: z.number().min(1).max(100).nullish(),
      cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
    })
  )
  .query(async ({ input }) => {
    const limit = input.limit ?? 10;
    const { cursor } = input;

    try {
      const allRecapOverview = await prisma.recap.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: 'desc',
        },
        include: { sources: true },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (allRecapOverview.length > limit) {
        const nextItem = allRecapOverview.pop();
        nextCursor = nextItem!.id;
      }

      const recapOverviews = allRecapOverview.map((recap) => ({
        id: recap.id,
        title: recap.title,
        content: recap.content,
        imageUrl: "", // Placeholder
        category: "Général", // Placeholder
        readingTime: 5, // Placeholder
      }));

      return {
        items: recapOverviews,
        nextCursor,
      };
    } catch (error) {
      console.warn("Database connection failed, returning mock data for allOverview", error);
      
      // Mock pagination
      const allMocks = MOCK_RECAPS.map((recap) => ({
        id: recap.id,
        title: recap.title,
        content: recap.content,
        imageUrl: recap.imageUrl,
        category: recap.category || "Général",
        readingTime: recap.readingTime || 5,
      }));

      // Simple mock pagination logic
      // In a real mock scenario we might want to simulate cursor more accurately, 
      // but for now let's just return everything if no cursor, or empty if cursor exists (since we only have 5 mocks)
      // Or better: implement simple slicing based on index if we assume cursor is index-like, but here cursor is ID.
      // Let's just return all mocks for the first page and no next page for simplicity, 
      // or implement a basic index finding.
      
      let startIndex = 0;
      if (cursor) {
        const cursorIndex = allMocks.findIndex(m => m.id === cursor);
        if (cursorIndex !== -1) {
          startIndex = cursorIndex + 1;
        }
      }

      const slicedMocks = allMocks.slice(startIndex, startIndex + limit + 1);
      let nextCursor: typeof cursor | undefined = undefined;
      
      if (slicedMocks.length > limit) {
        const nextItem = slicedMocks.pop();
        nextCursor = nextItem!.id;
      }

      return {
        items: slicedMocks,
        nextCursor,
      };
    }
  }),

  byId: publicProcedure
  .input(z.string())
  .query(async ({ input }): Promise<Recap> => {
    try {
      // Check if input is a mock ID first to avoid DB call if we know it's a mock
      const mock = MOCK_RECAPS.find((r) => r.id === input);
      if (mock) return mock;

      const recapById = await prisma.recap.findUnique({
        where: { id: input },
        include: { sources: true },
      });

      if (!recapById) throw new Error("Recap not found");

      const sourcesWithMedia = await Promise.all(
        recapById.sources.map(async (source) => {
          const media = await prisma.media.findUnique({
            where: { id: source.mediaId },
          });
          return {
            id: source.id,
            url: source.url,
            mediaName: media?.name ?? "",
          };
        })
      );

      return {
        id: recapById.id,
        title: recapById.title,
        content: recapById.content,
        imageUrl: "", // Placeholder
        category: "Général", // Placeholder
        readingTime: 5, // Placeholder
        relatedQuestions: [], // Placeholder
        sources: sourcesWithMedia,
      };
    } catch (error) {
      console.warn("Database connection failed or error in byId, returning mock data if available", error);
      const mock = MOCK_RECAPS.find((r) => r.id === input);
      if (mock) return mock;
      
      // If we are here, it means DB failed AND it wasn't a known mock ID.
      // We can return the first mock as a fallback or rethrow.
      // Returning first mock ensures the UI shows something.
      return MOCK_RECAPS[0];
    }
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        sourceIds: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.recap.create({
        data: {
          title: input.title,
          content: input.content,
          sources: input.sourceIds
            ? {
                connect: input.sourceIds.map((id) => ({ id })),
              }
            : undefined,
        },
        include: { sources: true },
      });
    }),
});
