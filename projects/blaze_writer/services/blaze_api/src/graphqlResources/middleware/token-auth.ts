import { logger } from '@the-long-chain/utils'
import { Context, Next } from 'koa'
import { authConfig } from '../../config/auth'

export default () =>
  async (ctx: Context, next: Next): Promise<void> => {
    const adminToken = ctx.headers[authConfig.adminToken.header]

    if (adminToken !== authConfig.adminToken.token) {
      ctx.status = 401
      logger.debug('Unauthorized')
      ctx.body = {
        status: 'Unauthorized',
        message: 'The header is missing or invalid.',
      }
    } else {
      await next()
    }
  }
