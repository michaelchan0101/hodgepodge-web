import Router from 'koa-router'
import { generalErrorHandler } from 'middlewares/errorHandler'
import { ResourceNotFoundError } from '@/errors'
import apiParamVerifier from 'middlewares/apiParamVerifier'
import V10 from './v1.0'

const METHODS = ['get', 'post', 'delete', 'patch', 'put']
export function getRouters() {
  const router = new Router({ prefix: '/api' })
  router.use(generalErrorHandler)

  V10.routes.forEach(route => {
    METHODS.forEach(method => {
      if (!route[method]) {
        return
      }
      const { handle, handles = [], schema, params } = route[method]
      if (params) {
        handles.push(apiParamVerifier(params))
      }
      if (handle) {
        handles.push(handle)
      }
      router[schema][method](`/${V10.version}${route.path}`, ...handles)
    })
  })
  // catch 404 and forward to error handler
  router.use(ctx => {
    throw new ResourceNotFoundError(ctx.request)
  })

  return router.routes()
}
