import { router, publicProcedure } from "../router";
import { z } from "zod";

export const recapRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.recap.findMany({
      include: { sources: true },
    });
  }),

  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.recap.findUnique({
      where: { id: input },
      include: { sources: true },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        sourceIds: z.array(z.string()).optional(), // pour relier des sources existantes
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.recap.create({
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
