import {
  Activity,
  BookOpen,
  Cpu,
  Globe,
  Newspaper,
  TrendingUp,
  Volleyball,
  Vote,
  type LucideIcon,
} from 'lucide-react'

export interface RecapOverview {
  id: string
  articleId: string
  title: string
  summary: string
  imageUrl: string
  category: string
  createdAt: number
  upVotes: number
  downVotes: number
}

export interface Recap {
  id: string
  upVotes: number
  downVotes: number
  article: Article
  sources: Sources[]
}

export interface Article {
  id: string
  title: string
  summary: string
  content: string
  imageUrl: string
  category: string
  readingTime: number
  createdAt: number
}

export interface Sources {
  id: string
  url: string
  media: Media
}

export interface Media {
  id: string
  name: string
  url: string
  logoUrl: string
}

export interface User {
  id: string
  email: string
  name: string
  avatarUrl?: string
}

export interface Comment {
  id: string
  content: string
  userId: string
  recapId: string
  createdAt: string
  user?: User
  parentId?: string | null
  replies?: Comment[]
}

export type Category = {
  id: string // unique identifier
  label: string // display label
  icon: LucideIcon // Lucide icon
  color: string // color code
}

export const CATEGORIES: Record<string, Category> = {
  all: { id: 'all', label: 'Tous', icon: Activity, color: '#dadfd9' },
  news: { id: 'news', label: 'Actualité', icon: Newspaper, color: '#BFDBFE' },
  science: { id: 'science', label: 'Science', icon: Cpu, color: '#E9D5FF' },
  politics: { id: 'politics', label: 'Politique', icon: Vote, color: '#fbd5beff' },
  culture: { id: 'culture', label: 'Culture', icon: BookOpen, color: '#FDE68A' },
  sports: { id: 'sports', label: 'Sports', icon: Volleyball, color: '#BBF7D0' },
  economy: { id: 'economy', label: 'Économie', icon: TrendingUp, color: '#99F6E4' },
  international: { id: 'international', label: 'International', icon: Globe, color: '#FECACA' },
}
