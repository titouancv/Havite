import { prisma } from "../../db";
import { router, publicProcedure } from "../trpc"
import { z } from "zod";

interface RecapOverview {
  id: string
  title: string
}

interface Recap {
  id: string
  title: string
  content: string
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
  .query(async (): Promise<RecapOverview[]> => {
    const allRecapOverview = await prisma.recap.findMany({
      include: { sources: true },
    });

    const recapOverviews = allRecapOverview
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 10)
    .map((recap) => ({
      id: recap.id,
      title: recap.title,
    }))
    return recapOverviews;
  }),

  byId: publicProcedure
  .input(z.string())
  .query(async ({ input }): Promise<Recap> => {
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
      sources: sourcesWithMedia,
    };
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
