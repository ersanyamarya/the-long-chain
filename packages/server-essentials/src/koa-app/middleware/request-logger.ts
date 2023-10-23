import { Context, Next } from 'koa'
import { logger } from '../../logger'
export default () =>
  async (ctx: Context, next: Next): Promise<void> => {
    const started = Date.now()
    await next()
    const elapsed = Date.now() - started + 'ms'

    const ip = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips || (ctx.socket && ctx.socket.remoteAddress)

    const msg = `${ctx.method}: ${ctx.url} - ${ctx.status} | ${ctx.type} | [${elapsed}] | ${ip}`
    logger.debug(msg)
  }
