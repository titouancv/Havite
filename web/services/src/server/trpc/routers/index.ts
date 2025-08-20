import { router } from "../router";
import { sourceRouter } from "./source";
import { recapRouter } from "./recap";
import { mediaRouter } from "./media";

export const appRouter = router({
  source: sourceRouter,
  recap: recapRouter,
  media: mediaRouter,
});

export type AppRouter = typeof appRouter;
