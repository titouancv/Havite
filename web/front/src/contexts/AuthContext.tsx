import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { supabase, saveUserToSupabase, getUserProfile } from '../utils/supabase'
import type { User } from '../types'

export async function fetchGoogleUser(accessToken: string): Promise<User> {
  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) throw new Error('Google userinfo fetch failed')

  const json = await res.json()
  return {
    id: json.sub,
    email: json.email,
    name: json.name,
    avatarUrl: json.picture,
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  accessToken: string | null
  logout: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // 🔍 Load initial session ONCE
  useEffect(() => {
    let ignore = false

    const init = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!ignore && session?.provider_token) {
          setAccessToken(session.provider_token)
        } else if (!ignore) {
          setLoading(false)
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Session load error:', e)
        setLoading(false)
      }
    }

    init()

    // 🔁 Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.provider_token) {
        setAccessToken(session.provider_token)
      } else {
        setAccessToken(null)
        setUser(null)
        setLoading(false)
      }
    })

    return () => {
      ignore = true
      subscription.unsubscribe()
    }
  }, [])

  // 👤 Load user profile when accessToken is ready
  useEffect(() => {
    if (!accessToken) return

    let ignore = false

    const loadUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session?.user?.id) {
          if (!ignore) setLoading(false)
          return
        }

        const userId = session.user.id

        // 🔍 First: check Supabase profile
        const profile = await getUserProfile(userId)
        if (profile) {
          if (!ignore) {
            setUser({
              id: userId,
              email: profile.email,
              name: profile.full_name,
              avatarUrl: profile.avatar_url,
            })
            setLoading(false)
          }
          return
        }

        // 🌐 Else: fetch from Google + save
        const googleUser = await fetchGoogleUser(accessToken)
        if (!ignore) setUser(googleUser)

        await saveUserToSupabase(googleUser, userId)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('User loading failed:', e)
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadUser()
    return () => {
      ignore = true
    }
  }, [accessToken])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
    setAccessToken(null)
    setLoading(false)
  }, [])

  const signInWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
  }, [])

  const value = {
    user,
    loading,
    accessToken,
    logout,
    signInWithGoogle,
    setUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
