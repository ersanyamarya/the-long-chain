import Router from '@koa/router'
import { Context } from 'koa'
import logger from '../logger'
export const router = new Router()

export type RouteObject = {
  route: string
  method: string
  handler: (ctx: Context) => void
}

type RouteOptions = {
  routes: Array<RouteObject>
  prefixRoute?: string
  middleware?: Array<Router.Middleware>
}
export async function serveRoutes({ routes, prefixRoute = '/', middleware = [] }: RouteOptions) {
  logger.info(`--------> Serving ${routes.length} ${prefixRoute} routes <--------`)
  routes.forEach(({ route, method, handler }, index) => {
    logger.debug(`${index + 1}. ${method.toUpperCase()} ${route}`)
    router[method](`${prefixRoute}${route}`, ...middleware, handler)
  })
  logger.info(`--------> ${routes.length} routes served <--------`)
}

type HealthCheck = {
  connected?: boolean
  status?: string
}

type HealthChecks = {
  [service: string]: () => HealthCheck
}

export type RootRouteOptions = {
  healthChecks: HealthChecks
  [key: string]: unknown
}

export async function getRootRoute({ healthChecks, ...info }: RootRouteOptions): Promise<void> {
  router.get('/', async (ctx: Context) => {
    const checks = { server: true }
    if (healthChecks) {
      Object.entries(healthChecks).forEach(([service, callback]) => {
        checks[service] = callback()
      })
    }
    ctx.body = {
      checks,
      misc: {
        ...info,
        routes: router.stack.map(({ methods, path }) => ({
          methods: methods.join(','),
          path,
        })),
      },
    }
  })
}
