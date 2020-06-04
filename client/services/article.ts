import fetch from './fetch'
import { ListArticlesResponse } from 'types/article'

export async function listArticles(
  limit: number,
  offset: number
): Promise<ListArticlesResponse> {
  const result = await fetch.get('/api/v1.0/articles', { params: { limit, offset } })
  return result.data
}
