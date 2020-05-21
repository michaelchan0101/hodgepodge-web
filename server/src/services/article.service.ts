import { Article } from '@/models'
import {
  ImportArticleRequest,
  CreateOrUpdateArticleRequest,
  ArticleResponse,
  ListArticlesResponse,
  ListArticlesFilter,
} from 'interfaces/article'
import fs from 'fs'
import { Op } from 'sequelize'
import { Converter } from 'showdown'

const converter = new Converter()

async function md2html(path: string): Promise<string> {
  const md = await fs.promises.readFile(path)
  return converter.makeHtml(md.toString())
}

async function createArtcle(req: CreateOrUpdateArticleRequest): Promise<Article> {
  const article: Article = await Article.create({ ...req, createdAt: req.updatedAt })
  article.set({ updatedAt: req.updatedAt }, { raw: true })
  await article.save({ silent: true, fields: ['updatedAt'] })
  return article
}

async function updateArtcle(
  article: Article,
  req: CreateOrUpdateArticleRequest
): Promise<Article> {
  article.set(req, { raw: true })
  await article.save({ silent: true, fields: ['updatedAt'] })
  return article
}

async function getFileUpdatedAt(path: string): Promise<Date> {
  const stats = await fs.promises.stat(path)
  return stats.mtime
}

export default {
  async batchImportArtcles(
    files: Array<ImportArticleRequest>
  ): Promise<Array<ArticleResponse>> {
    const articles = await Article.findAll({
      where: { title: { [Op.in]: files.map(file => file.title) } },
    })
    const articleObj: { [title: string]: Article } = {}
    articles.forEach(article => {
      articleObj[article.title] = article
    })
    const nArticles: Array<ArticleResponse> = []
    for await (const file of files) {
      const { path, title, categoryId } = file
      const updatedAt = await getFileUpdatedAt(path)
      if (
        articleObj[title] &&
        updatedAt.getTime() <= articleObj[title].createdAt.getTime()
      ) {
        return
      }

      const content = await md2html(file.path)
      const articleReq: CreateOrUpdateArticleRequest = {
        content,
        title,
        categoryId,
        updatedAt,
      }

      let article: Article
      if (!articleObj[title]) {
        article = await createArtcle(articleReq)
      } else {
        article = await updateArtcle(articleObj[title], articleReq)
      }
      nArticles.push(article.getResponse())
    }
    return nArticles
  },
  async listArtcles(
    filters: ListArticlesFilter,
    limit = 20,
    offset = 0
  ): Promise<ListArticlesResponse> {
    const where: Record<string, any> = {}
    if (filters.categoryId) {
      where.categoryId = filters.categoryId
    }
    const articles = await Article.findAll({
      where,
      limit,
      offset,
    })
    return {
      articles: articles.map((article: Article) => article.getResponse()),
      limit,
      offset,
    }
  },
}
