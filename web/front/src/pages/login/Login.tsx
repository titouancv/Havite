import styles from './login.module.scss'
import { useAuth } from '@/hooks/useAuth'
import glyph from '../../assets/glyph.svg'
import { useRouter } from '@tanstack/react-router'
import Button from '@/components/button/Button'

const Login = () => {
  const { signInWithGoogle } = useAuth()

  const handleGoogle = async () => {
    try {
      await signInWithGoogle()
      // After redirect the Supabase session will update the app state
    } catch (err) {
      console.error('Google sign-in error', err)
    }
  }

  const router = useRouter()

  const goBack = () => {
    router.history.back()
  }

  return (
    <div className={styles.pageContainerContainer}>
      <div className={styles.pageContainerWrapper}>
        <div className={styles.pageContainer_body}>
          <div className={styles.login}>
            <div className={styles.login_header}>
              <h1 className={styles.login_title}>Se connecter</h1>
              <div className={styles.login_close} onClick={goBack}>
                <img src={glyph} alt="Close icon" />
              </div>
            </div>
            <div className={styles.container}>
              <p>Connectez-vous ou créer votre compte Havite</p>
              <Button onClick={handleGoogle}>Se connecter avec Google</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
