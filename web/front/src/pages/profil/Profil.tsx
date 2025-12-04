import { useAuth } from '@/hooks/useAuth'
import glyph from '../../assets/glyph.svg'
import { useRouter } from '@tanstack/react-router'
import Button from '@/components/Button'
import { LogOut } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/utils/supabase'
import Input from '@/components/Input'

const Profil = () => {
  const router = useRouter()
  const { user, loading, logout, setUser } = useAuth()

  const [name, setName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [enableSaving, setEnableSaving] = useState(false)
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

  const handleName = (value: string) => {
    setEnableSaving(value !== name)
    setName(value)
  }

  const handleSave = useCallback(async () => {
    if (!user) return

    setIsSaving(false)
    setMessage(null)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session?.user) throw new Error('No active session')

      const { error } = await supabase
        .from('users')
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
      setIsSaving(false)
    }
  }, [name, user, setUser])

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="flex flex-col items-center justify-between w-full max-w-[1220px] h-full">
          <div className="p-4">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex flex-col items-center justify-between w-full max-w-[1220px] h-full">
        <div className="flex flex-col relative items-start justify-start w-full flex-1 overflow-hidden gap-8 px-4 pt-4 md:gap-3">
          <div className="w-full h-full flex flex-col items-center justify-start px-4 gap-6 z-[1000] bg-gray-100 text-gray-800">
            <div className="flex items-start justify-between w-full">
              <h1 className="font-bold max-w-[80%]">Profil</h1>
              <div
                className="p-3 cursor-pointer"
                onClick={() => router.history.back()}
              >
                <img src={glyph} alt="Close icon" />
              </div>
            </div>

            <div className=" flex flex-col gap-4 w-full">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <h2>Informations</h2>
                  <div>
                    <label className="block mb-1 font-bold">Email</label>
                    <p>{user?.email || ''}</p>
                  </div>

                  <div>
                    <label className="block mb-1 font-bold">Display Name</label>
                    <Input
                      value={name}
                      type={'text'}
                      placeholder={''}
                      onChange={(e) => handleName(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <Button
                      variant="primary"
                      onClick={handleSave}
                      disabled={!enableSaving || isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>

                    {message && (
                      <span
                        className={
                          message.includes('Error')
                            ? 'text-status-error'
                            : 'text-status-success'
                        }
                      >
                        {message}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="mb-4">A propos</h2>
                  <Button
                    variant="info"
                    onClick={() =>
                      router.navigate({ to: '/about', replace: false })
                    }
                  >
                    En savoir plus sur Havite
                  </Button>
                </div>

                <div>
                  <h2 className="mb-4 text-status-error">Danger Zone</h2>

                  <Button variant="error" onClick={handleLogout}>
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
