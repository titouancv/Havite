import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../../db";
import { MOCK_MEDIAS } from "../../mocks/data";

export const mediaRouter = router({
  all: publicProcedure
  .query(async () => {
    try {
      return await prisma.media.findMany({
        include: { sources: true },
      });
    } catch (error) {
      console.warn("Database connection failed, returning mock data for media.all", error);
      return MOCK_MEDIAS;
    }
  }),

  byId: publicProcedure
  .input(z.string())
  .query(async ({  input }) => {
    try {
      const mock = MOCK_MEDIAS.find(m => m.id === input);
      if (mock) return mock;

      return await prisma.media.findUnique({
        where: { id: input },
        include: { sources: true },
      });
    } catch (error) {
      console.warn("Database connection failed, returning mock data for media.byId", error);
      return MOCK_MEDIAS.find(m => m.id === input) || MOCK_MEDIAS[0];
    }
  }),

  create: publicProcedure
    .input(
      z.object({
        url: z.string(),
      })
    )
    .mutation(async ({  input }) => {
      return await prisma.media.create({
        data: {
          url: input.url,
        },
      });
    }),
});
