import { createFileRoute } from '@tanstack/react-router'
import Home from '../pages/home/Home'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Home/>
}
