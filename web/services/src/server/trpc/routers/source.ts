import { router, publicProcedure } from "../router";
import { z } from "zod";

export const sourceRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.source.findMany({
      include: { media: true, recaps: true },
    });
  }),

  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.source.findUnique({
      where: { id: input },
      include: { media: true, recaps: true },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        url: z.string().url(),
        mediaId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.source.create({
        data: {
          url: input.url,
          mediaId: input.mediaId,
        },
      });
    }),
});
