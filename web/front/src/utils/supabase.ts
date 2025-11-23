import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/* ----------------------------- DB Interfaces ----------------------------- */

export interface DBMedia {
  id: string
  name: string
  url: string
  logo_url: string
}

export interface DBSource {
  id: string
  url: string
  media: DBMedia
}

export interface DBArticle {
  id: string
  title: string
  content_recap: string
  content: string
  image_url: string
  category: string
  reading_time: number
  created_at: number
}

export interface DBRecap {
  id: string
  article: DBArticle
  sources: DBSource[]
}
