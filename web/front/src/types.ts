export interface RecapOverview {
  id: string
  articleId: string // 👈 ajouté
  title: string
  content: string
  imageUrl: string
  category: string
  createdAt: number
  upVotes: number
  downVotes: number
}

export interface Recap {
  id: string
  upVotes: number // 👈 ajouté
  downVotes: number // 👈 ajouté
  article: Article
  sources: Sources[]
}

export interface Article {
  id: string
  title: string
  contentRecap: string
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
