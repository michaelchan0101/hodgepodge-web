import fetch from './fetch'

export async function listArticles(limit: number, offset: number) {
  const result = await fetch.get('/api/v1.0/articles', { data: { limit, offset } })
  return result.data
}
