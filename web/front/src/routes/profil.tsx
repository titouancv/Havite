import Profil from '@/pages/profil/Profil'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/profil')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Profil />
}
