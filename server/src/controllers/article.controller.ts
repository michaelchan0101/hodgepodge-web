import { Context } from 'interfaces/http'
import articleService from 'services/article.service'

export default {
  async listArticles(ctx: Context) {
    const { categoryId, limit, offset } = ctx.request.query
    ctx.body = await articleService.listArticles({ categoryId }, limit, offset)
  },
}
