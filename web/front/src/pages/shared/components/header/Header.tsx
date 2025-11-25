import styles from './header.module.scss'
import logoMonogram from '@/assets/logoMonogram.svg'
import { Link, useRouter } from '@tanstack/react-router'
import { useAuth } from '@/hooks/useAuth'
import Button from '@/components/button/Button'

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
    <header className={styles.headerContainer}>
      <Link to="/">
        <div className={styles.homeButton}>
          <img className={styles.logo} src={logoMonogram} alt="Havite logo" />
          <h1>HAVITE</h1>
        </div>
      </Link>
      <div className={styles.authContainer}>
        {user ? (
          <Button onClick={goProfil}>
            {user.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className={styles.avatarImg}
              />
            )}
            <div className={styles.userName}>{user.name}</div>
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
