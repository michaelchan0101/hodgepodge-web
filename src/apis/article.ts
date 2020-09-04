import fetch from './fetch'
import { ListArticlesResponse, ArticleResponse } from 'types/article'

export async function listArticles(
  limit: number,
  offset: number
): Promise<ListArticlesResponse> {
  const result = await fetch.get('/api/client/v1.0/articles', {
    params: { limit, offset },
  })
  return result.data
}

export async function getArticle(id: number): Promise<ArticleResponse> {
  const result = await fetch.get(`/api/client/v1.0/articles/${id}`)
  return result.data
}
