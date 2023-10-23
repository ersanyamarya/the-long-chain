import { logger } from '@the-long-chain/utils'
import Mongoose, { Connection, ConnectOptions } from 'mongoose'
const connectionStatus = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting']

type databaseHealthCheck = {
  status: string
}

export type mongoDbExtension = {
  healthCheck(): databaseHealthCheck
}

let connection: Connection

export const connectMongoDB = (uri: string, options: ConnectOptions): mongoDbExtension => {
  if (connection) {
    return
  }
  Mongoose.connect(uri, options)
  connection = Mongoose.connection

  connection.once('open', async () => {
    logger.info(`Connected to database`)
  })

  connection.on('error', error => {
    logger.error(error.stack)
  })

  return {
    healthCheck(): databaseHealthCheck {
      return { status: connectionStatus[connection.readyState] }
    },
  }
}

export const disconnectMongoDB = (): void => {
  logger.info('MongoDB connection disconnected')
  if (!connection) {
    return
  }
  Mongoose.disconnect()
}

export * from './resources'
