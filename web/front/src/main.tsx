import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { trpc } from './utils/trpc'
import { httpBatchLink } from '@trpc/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { routeTree } from './routeTree.gen'
import NotFound from './pages/not-found/NotFound'

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => <NotFound />,
})
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc', // backend Next.js
    }),
  ],
})

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </trpc.Provider>
    </StrictMode>
  )
}
