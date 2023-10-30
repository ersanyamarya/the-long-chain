import { koaMiddleware } from '@as-integrations/koa'
import {
  apolloServerPlugin,
  exceptions,
  getRootRoute,
  gracefulShutdown,
  koaApp,
  router,
  setServerEssentialsLogger,
} from '@ersanyamarya/server-essentials'
import { connectMongoDB, disconnectMongoDB } from '@the-long-chain/blaze-mongo'

import { logger } from '@the-long-chain/utils'
import { credential } from 'firebase-admin'
import { initializeApp } from 'firebase-admin/app'
import http from 'http'
import { Context } from 'koa'
import { authConfig } from './config/auth'
import { getFirebaseConfig } from './config/firebase'
import { mongoDbConfig } from './config/mongodb'
import { blazeApiServerConfig } from './config/server'
import getSchema from './graphqlResources'
const port = blazeApiServerConfig.port

const serviceAccount = getFirebaseConfig('fireBaseAdmin.json')

setServerEssentialsLogger(logger)

const start = async (): Promise<void> => {
  exceptions()
  initializeApp({
    credential: credential.cert(serviceAccount),
  })

  const mongoDB = connectMongoDB(mongoDbConfig.uri, mongoDbConfig.options)

  const schema = getSchema()
  const app = await koaApp()
  const httpServer = http.createServer(app.callback())

  // Set up Apollo Server
  const apolloServer = await apolloServerPlugin(schema, httpServer)

  router.post(
    '/graphql',
    koaMiddleware(apolloServer, {
      context: async ({ ctx }) => {
        logger.debug(`operationName: ${ctx.request.body['operationName']}`)
        const adminToken = ctx.request.headers[authConfig.adminToken.header]
        if (adminToken) {
          if (adminToken === authConfig.adminToken.token) ctx.admin = true
          else logger.error(`Invalid admin token: ${adminToken}`)
        }
        const token = ctx.request.headers[authConfig.jwt.header]

        if (token) ctx.token = token
        return ctx
      },
    })
  )
  router.get('/graphql', koaMiddleware(apolloServer))
  router.get('/health', (ctx: Context) => {
    ctx.status = 200
  })

  await getRootRoute({
    healthChecks: { database: mongoDB.healthCheck },
    service: process.env['NX_TASK_TARGET_PROJECT'] || '',
    developer: {
      name: 'Sanyam Arya',
      email: 'sanyam@beeta.one',
    },
  })

  app.use(router.routes()).use(router.allowedMethods())
  const server = httpServer
    .listen({ port }, () => {
      logger.info(`Server listening on ${blazeApiServerConfig.host}`)
      logger.info(`GraphQL server listening on ${blazeApiServerConfig.graphqlURL}`)
    })
    .on('error', err => {
      logger.error(err)
      process.exit(1)
    })

  const onShutdown = async (): Promise<void> => {
    disconnectMongoDB()
    logger.info('Shutting down server...')
  }

  gracefulShutdown(server, onShutdown)
}

start()
