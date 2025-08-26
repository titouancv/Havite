import { router } from './trpc/trpc';
import { sourceRouter } from "./trpc/routers/source";
import { recapRouter } from "./trpc/routers/recap";
import { mediaRouter } from "./trpc/routers/media";

export const appRouter = router({
  source: sourceRouter,
  recap: recapRouter,
  media: mediaRouter,
});

export type AppRouter = typeof appRouter;

