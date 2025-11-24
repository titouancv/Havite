import styles from './profil.module.scss'
import { useAuth } from '@/hooks/useAuth'
import glyph from '../../assets/glyph.svg'
import { useRouter } from '@tanstack/react-router'
import Button from '@/components/button/Button'
import { LogOut } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/utils/supabase'

const Profil = () => {
  const router = useRouter()
  const { user, loading, logout, setUser } = useAuth()

  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // 🧭 Redirect & initialize user's display name
  useEffect(() => {
    // If auth finished loading and no user → redirect to login
    if (!loading && !user) {
      router.navigate({ to: '/login' })
      return
    }

    // Initialize display name once
    if (user && name === '') {
      setName(user.name || '')
    }
  }, [loading, user, name, router])

  const handleLogout = useCallback(async () => {
    router.navigate({ to: '/' })
    await logout()
  }, [logout, router])

  const handleSave = useCallback(async () => {
    if (!user) return

    setSaving(true)
    setMessage(null)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) throw new Error('No active session')

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id)

      if (error) throw error

      // Update our global auth state
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setUser((user ? { ...user, name } : user) as any)

      setMessage('Settings saved successfully')
      setTimeout(() => setMessage(null), 3000)
    } catch (e) {
      console.error('Error updating profile:', e)
      setMessage('Error saving settings')
    } finally {
      setSaving(false)
    }
  }, [name, user, setUser])

  if (loading) {
    return (
      <div className={styles.pageContainerContainer}>
        <div className={styles.pageContainerWrapper}>
          <div className={styles.loadingContainer}>Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.pageContainerContainer}>
      <div className={styles.pageContainerWrapper}>
        <div className={styles.pageContainer_body}>
          <div className={styles.profil}>
            <div className={styles.profil_header}>
              <h1 className={styles.profil_title}>Profil</h1>
              <div className={styles.profil_close} onClick={() => router.history.back()}>
                <img src={glyph} alt="Close icon" />
              </div>
            </div>

            <div className={styles.container}>
              <div className={styles.spaceY6}>
                <div>
                  <label className={styles.label}>Email</label>
                  <input
                    type="text"
                    value={user?.email ?? ''}
                    disabled
                    className={styles.inputDisabled}
                  />
                </div>

                <div>
                  <label className={styles.label}>Display Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.inputName}
                  />
                </div>

                <div className={styles.saveRow}>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>

                  {message && (
                    <span
                      className={
                        message.includes('Error') ? styles.messageError : styles.messageSuccess
                      }
                    >
                      {message}
                    </span>
                  )}
                </div>

                <div className={styles.dangerZone}>
                  <h3 className={styles.dangerTitle}>Danger Zone</h3>

                  <Button variant="secondary" onClick={handleLogout} className={styles.logoutBtn}>
                    <span>Log out</span>
                    <LogOut />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profil
