import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import NotFound from './pages/not-found/NotFound'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { TRPCProvider } from './utils/trpc'
import type { AppRouter } from '../../services/src/server'

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <NotFound />,
})
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc',
    }),
  ],
})

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 60 * 1000,
      },
    },
  })
}
let browserQueryClient: QueryClient | undefined = undefined
function getQueryClient() {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return makeQueryClient()
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={getQueryClient()}>
        <TRPCProvider trpcClient={trpcClient} queryClient={getQueryClient()}>
          <RouterProvider router={router} />
        </TRPCProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}
