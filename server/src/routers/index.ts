import Router from 'koa-router'
import { generalErrorHandler } from 'middlewares/errorHandler'
import { ResourceNotFoundError } from '@/errors'

export function getRouters() {
  const router = new Router({ prefix: '/api' })
  router.use(generalErrorHandler)

  // catch 404 and forward to error handler
  router.use(ctx => {
    throw new ResourceNotFoundError(ctx.request)
  })

  return router.routes()
}
