import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../../services/src/server/trpc/routers/'

export const trpc = createTRPCReact<AppRouter>()
