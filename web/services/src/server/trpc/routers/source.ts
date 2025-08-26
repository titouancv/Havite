import { prisma } from "../../db";
import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const sourceRouter = router({
  all: publicProcedure
  .query(async () => {
    return await prisma.source.findMany({
      include: { media: true, recaps: true },
    });
  }),

  byId: publicProcedure
  .input(z.string())
  .query(async ({ input }) => {
    return await prisma.source.findUnique({
      where: { id: input },
      include: { media: true, recaps: true },
    });
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
