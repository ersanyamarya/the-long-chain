import { GraphQLError } from 'graphql/error'
import logger from '../../logger'
import { ErrorCode, errorData } from './errorCodes'
const GQLErrorHandler = (message: string, code: ErrorCode, context?: Record<string, unknown>) => {
  logger.error(JSON.stringify({ message, code, context }, null, 2))
  handleDuplicateKeyError(message.toString())
  throw new GraphQLError(message, {
    extensions: {
      code,
    },
  })
}

export { ErrorCode, GQLErrorHandler, errorData }

function handleDuplicateKeyError(message: string) {
  if (message.includes('duplicate key error')) {
    // const collection = message.match(/mqtizer.(\w+)/)[1]
    // const name = message.match(/name: "(\w+)"/)[1]
    throw new GraphQLError(message, {
      extensions: {
        code: 'DUPLICATE_KEY_ERROR',
      },
    })
  }
}
