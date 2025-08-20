import { router, publicProcedure } from "../router";
import { z } from "zod";

export const mediaRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.media.findMany({
      include: { sources: true },
    });
  }),

  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.media.findUnique({
      where: { id: input },
      include: { sources: true },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        url: z.string().url(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.media.create({
        data: {
          url: input.url,
        },
      });
    }),
});
