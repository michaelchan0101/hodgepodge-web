export interface ImportArticleRequest {
  categoryId: number
  title: string
  path: string
}

export interface CreateOrUpdateArticleRequest {
  categoryId: number
  title: string
  content: string
  updatedAt: Date
}

export interface ArticleResponse {
  id: number
  categoryId: number
  title: string
  content: string
  createdAt: number
  updatedAt: number
}

export interface ListArticlesFilter {
  categoryId?: number
}

export interface ListArticlesResponse {
  articles: Array<Article>
  limit: number
  offset: number
}