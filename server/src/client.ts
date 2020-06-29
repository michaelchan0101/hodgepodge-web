import Koa, { Context, Next } from 'koa'
import http from 'http'
import next from 'next'
import path from 'path'
import staticCache from 'koa-static-cache'
import Router from 'koa-router'
import logger from 'koa-logger'
import fs from 'fs'

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
  router.get('/', ctx => {
    ctx.status = 200
    return nextApp.render(ctx.req, ctx.res, '/index')
  })

  router.get('/sw.js', ctx => {
    const filePath = path.join(nextApp.dir, '.next', ctx.request.path)
    // ctx.status = 200
    ctx.response.set('content-type', 'application/javascript')
    const stream = fs.createReadStream(filePath)
    ctx.body = stream
  })

  router.get('/workbox-:name(.*)', ctx => {
    const filePath = path.join(nextApp.dir, `.next`, ctx.request.path)
    ctx.response.set('content-type', 'application/javascript')
    const stream = fs.createReadStream(filePath)
    ctx.body = stream
  })

  router.get('/article/:id', ctx => {
    ctx.status = 200
    return nextApp.render(ctx.req, ctx.res, '/article/[id]', {
      id: ctx.params.id,
    })
  })

  router.get('/articles', ctx => {
    ctx.status = 200
    return nextApp.render(ctx.req, ctx.res, '/articles')
  })

  router.get('*', ctx => {
    return handle(ctx.req, ctx.res)
  })

  return router.routes()
}
async function main() {
  const app = new Koa()
  app.use(logger())
  app.use(pageErrorHandler)
  app.use(
    staticCache(path.join(__dirname, '../public'), {
      maxAge: 365 * 24 * 60 * 60,
    })
  )
  app.use(getRoutes())

  nextApp.prepare().then(() => {
    const server = http.createServer(app.callback())
    server.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
}

main()
