import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { logger } from '../logger'
import requestLoggerMiddleware from './middleware/request-logger'
export const koaApp = async (): Promise<Koa> => {
  logger.info('---------------> Creating Koa App <---------------')
  const app = new Koa()

  app.use(requestLoggerMiddleware())

  app.use(cors())
  app.use(
    bodyParser({
      enableTypes: ['json', 'form', 'text', 'xml'],
      formLimit: '56kb',
    })
  )
  return app
}
