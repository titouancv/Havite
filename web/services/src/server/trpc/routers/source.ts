import { prisma } from "../../db";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { MOCK_SOURCES } from "../../mocks/data";

export const sourceRouter = router({
  all: publicProcedure
  .query(async () => {
    try {
      return await prisma.source.findMany({
        include: { media: true, recaps: true },
      });
    } catch (error) {
      console.warn("Database connection failed, returning mock data for source.all", error);
      return MOCK_SOURCES;
    }
  }),

  byId: publicProcedure
  .input(z.string())
  .query(async ({ input }) => {
    try {
      const mock = MOCK_SOURCES.find(s => s.id === input);
      if (mock) return mock;

      return await prisma.source.findUnique({
        where: { id: input },
        include: { media: true, recaps: true },
      });
    } catch (error) {
      console.warn("Database connection failed, returning mock data for source.byId", error);
      return MOCK_SOURCES.find(s => s.id === input) || MOCK_SOURCES[0];
    }
  }),

  create: publicProcedure
    .input(
      z.object({
        url: z.string(),
        mediaId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.source.create({
        data: {
          url: input.url,
          mediaId: input.mediaId,
        },
      });
    }),
});
