import Koa, { Context, Next } from 'koa'
import http from 'http'
import next from 'next'
import path from 'path'
import staticServe from 'koa-static'
import Router from 'koa-router'

const PORT = process.env.NODE_HODGEPODGE_CLIENT_PORT || 3001

const nextApp = next({
  dev: process.env.NODE_HODGEPODGE_CLIENT_ENV !== 'production',
  dir: path.join(__dirname, '../../client'),
})
const handle = nextApp.getRequestHandler()

const pageErrorHandler = async (ctx: Context, next: Next) => {
  try {
    await next()
  } catch (err) {
    // ctx.req.errorFromPageErrorHandler = err
    // ctx.req.status = 500
    return nextApp.render(ctx.req, ctx.res, '/_error', ctx.request.query)
  }
}

function getRoutes() {
  const router = new Router()
  router.get('/articles/:id', ctx => {
    return nextApp.render(ctx.req, ctx.res, '/article', { id: ctx.params.id })
  })

  router.get('/articles', ctx => {
    return nextApp.render(ctx.req, ctx.res, '/articles')
  })
  router.get('*', ctx => {
    return handle(ctx.req, ctx.res)
  })

  return router.routes()
}
async function main() {
  const app = new Koa()
  app.use(pageErrorHandler)
  app.use(staticServe(path.join(__dirname, '../public')))
  app.use(getRoutes())

  nextApp.prepare().then(() => {
    const server = http.createServer(app.callback())
    server.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
}

main()
