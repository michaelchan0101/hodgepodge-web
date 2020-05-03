import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import next from 'next'
import { parse } from 'url'
import path from 'path'
// import { ResourceNotFoundError } from '@/errors'
// import errorHandler from 'middlewares/error'
import router from './routers'
import { Context } from './interfaces/http'

const nextClientApp = next({
  dev: process.env.NODE_ENV !== 'production',
  dir: path.join(__dirname, '../../client'),
})

const handle = nextClientApp.getRequestHandler()
const serverHandler = async (ctx: Context) => {
  // Be sure to pass `true` as the second argument to `url.parse`.
  // This tells it to parse the query portion of the URL.
  const parsedUrl = parse(ctx.request.url, true)
  const { pathname, query } = parsedUrl
  // await handle(ctx.req, ctx.res, parsedUrl)
  ctx.status = 200
  if (pathname === '/') {
    await nextClientApp.render(ctx.req, ctx.res, '/', query)
  } else {
    await handle(ctx.req, ctx.res, parsedUrl)
  }
  ctx.respond = false
}

export default {
  nextClientApp,
  async createApiServer(): Promise<Koa> {
    const app = new Koa()
    // app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
    // app.use(logger('dev'))
    app.use(
      bodyParser({
        enableTypes: ['json', 'form', 'xml'],
      })
    )
    // app.use(errorHandler.genericSwaggerErrorHandler)
    // app.use(async (ctx, next) => {
    //   try {
    //     await next()
    //   } catch (err) {
    //     errorHandler.generalErrorHandler(err, ctx)
    //   }
    // })

    app.use((ctx, next) => {
      ctx.set('Access-Control-Allow-Origin', '*')
      ctx.set('Access-Control-Allow-Credentials', 'true')
      ctx.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, auth-schema-4923'
      )
      ctx.set('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE, OPTIONS')
      if (ctx.request.method === 'OPTIONS') {
        ctx.status = 200
      } else {
        return next()
      }
    })
    app.use((ctx, next) => {
      // inject nextClientApp
      ctx.nextClientApp = nextClientApp
      return next()
    })
    // init props
    // app.use((ctx, next) => {
    //   ctx.request.props = {
    //     userAgent: ctx.request.useragent,
    //   }
    //   return next()
    // })
    app.use(router(nextClientApp).routes())
    app.use(serverHandler)
    // catch 404 and forward to error handler
    // app.use(ctx => {
    //   throw new ResourceNotFoundError(ctx.request)
    // })
    // app.on('error', errorHandler.generalErrorHandler)
    return app
  },
}
