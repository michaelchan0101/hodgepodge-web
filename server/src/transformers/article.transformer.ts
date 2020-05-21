import { Article } from '@/models'
import { ArticleResponse } from 'interfaces/article'
export function getArticleResponse(article: Article): ArticleResponse {
  return {
    id: article.id,
    categoryId: article.categoryId,
    title: article.title,
    content: article.content,
    category: article.Category?.response,
    createdAt: article.createdAt.getTime(),
    updatedAt: article.updatedAt.getTime(),
  }
}
