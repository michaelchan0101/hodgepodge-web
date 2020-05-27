import { RouteOptions } from 'interfaces/http'
import Joi from '@hapi/joi'
import articleController from 'controllers/article.controller'

const routes: Array<RouteOptions> = [
  {
    path: '/articles',
    get: {
      title: '文章列表',
      params: {
        query: {
          categoryId: Joi.number().empty(),
          limit: Joi.number().empty(),
          offset: Joi.number().empty(),
        },
      },
      handle: articleController.listArticles,
    },
  },
  {
    path: '/articles/:id(\\d+)',
    get: {
      title: '文章详情',
      handle: articleController.getArticle,
    },
  },
]

export default {
  version: 'v1.0',
  routes,
}
