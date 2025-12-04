import logoMonogram from '@/assets/logoMonogram.svg'
import { Link, useRouter } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/Button'

function Header() {
  const { user } = useAuth()

  const router = useRouter()

  const goLogin = () => {
    router.navigate({ to: '/login' })
  }

  const goProfil = () => {
    router.navigate({ to: '/profil' })
  }

  return (
    <header className="flex w-full gap-2 items-center justify-center px-4 py-2">
      <Link to="/">
        <div className="flex gap-2 items-center justify-center">
          <img className="w-10 h-10" src={logoMonogram} alt="Havite logo" />
          <h1 className="font-bold">HAVITE</h1>
        </div>
      </Link>
      <div className="ml-auto">
        {user ? (
          <Button onClick={goProfil}>
            {user.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover sm:mr-1 mr-0"
              />
            )}
            <div className="hidden sm:block">{user.name}</div>
          </Button>
        ) : (
          <Button variant="primary" onClick={() => goLogin()}>
            Se connecter
          </Button>
        )}
      </div>
    </header>
  )
}

export default Header
