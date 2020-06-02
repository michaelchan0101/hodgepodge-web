import { AppProps } from 'next/app'
import { CategoryResponse } from './category'

export interface ArticleResponse {
  id: number
  categoryId: number
  title: string
  content: string
  category?: CategoryResponse
  createdAt: number
  updatedAt: number
}

export interface ListArticlesResponse {
  articles: Array<ArticleResponse>
  limit: number
  offset: number
}

export interface ArticleDetailProps extends AppProps {
  article: ArticleResponse
}

export interface ArticlesProps extends AppProps {
  listArticlesResponse: ListArticlesResponse
}
