export interface RecapOverview {
  id: string
  title: string
  content: string
  imageUrl: string
  category: string
  createdAt: number
}

export interface Recap {
  id: string
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
