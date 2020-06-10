import Koa from 'koa'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import { parse } from 'url'
import staticServe from 'koa-static'
// import errorHandler from 'middlewares/error'
import { getRouters } from './routers'
import { Context, Next } from './interfaces/http'
import NextServer from 'next/dist/next-server/server/next-server'

const serverHandler = (nextApp: NextServer) => {
  const handle = nextApp.getRequestHandler()
  return async (ctx: Context, next: Next) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(ctx.request.url, true)
    const { pathname, query } = parsedUrl
    // await handle(ctx.req, ctx.res, parsedUrl)
    ctx.status = 200
    if (pathname === '/') {
      await nextApp.render(ctx.req, ctx.res, '/', query)
    } else {
      await handle(ctx.req, ctx.res, parsedUrl)
    }
    ctx.respond = false
  }
}

export async function createApiServer(
  nextApp?: NextServer,
  isTest?: boolean
): Promise<Koa> {
  const app = new Koa()
  app.use(staticServe(path.join(__dirname, '../public')))
  // app.use(logger('dev'))
  app.use(
    bodyParser({
      enableTypes: ['json', 'form', 'xml'],
    })
  )

  // inject nextApp

  // init props
  // app.use((ctx, next) => {
  //   ctx.request.props = {
  //     userAgent: ctx.request.useragent,
  //   }
  //   return next()
  // })
  app.use(getRouters())
  if (nextApp) {
    app.use((ctx, next) => {
      ctx.nextApp = nextApp
      return next()
    })
    app.use(serverHandler(nextApp))
  }

  // app.on('error', errorHandler.generalErrorHandler)
  return app
}
