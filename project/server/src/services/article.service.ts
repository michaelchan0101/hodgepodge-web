import { Article } from '@/models'
import {
  ImportArticleRequest,
  CreateOrUpdateArticleRequest,
  ArticleResponse,
} from 'interfaces/article'
import { getArticleResponse } from 'transformers/article.transformer'
import fs from 'fs'
import { Op } from 'sequelize'
import { Converter } from 'showdown'

const converter = new Converter()

async function md2html(path: string): Promise<string> {
  const md = await fs.promises.readFile(path)
  return converter.makeHtml(md.toString())
}

async function createArtcle(req: CreateOrUpdateArticleRequest): Promise<Article> {
  const article = await Article.create({ ...req, createdAt: req.updatedAt })
  return article
}

async function updateArtcle(
  id: number,
  req: CreateOrUpdateArticleRequest
): Promise<Article> {
  const article = await Article.update(req, { where: { id } })
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
    const articles: Array<Article> = await Article.findAll({
      where: { title: { [Op.in]: files.map(file => file.title) } },
    })
    const articleObj = {}
    articles.forEach(article => {
      articleObj[article.title] = {
        id: article.id,
        createdAt: article.createdAt.getTime(),
      }
    })
    const nArticles: Array<ArticleResponse> = []
    for await (const file of files) {
      const { path, title, categoryId } = file
      const updatedAt = await getFileUpdatedAt(path)
      if (articleObj[title] && updatedAt.getTime() <= articleObj[title].createdAt) {
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
        article = await updateArtcle(articleObj[title].id, articleReq)
      }
      nArticles.push(getArticleResponse(article))
    }
    return nArticles
  },
}
