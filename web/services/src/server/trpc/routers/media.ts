import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { prisma } from "../../db";

export const mediaRouter = router({
  all: publicProcedure
  .query(async () => {
    return await prisma.media.findMany({
      include: { sources: true },
    });
  }),

  byId: publicProcedure
  .input(z.string())
  .query(async ({  input }) => {
    return await prisma.media.findUnique({
      where: { id: input },
      include: { sources: true },
    });
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
