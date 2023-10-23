// eslint-disable-next-line @nx/enforce-module-boundaries

import { GQLErrorHandler } from '@ersanyamarya/server-essentials'

const onlyDevMiddleware = async (resolve, source, args, context, info) => {
  const { admin } = context

  if (!admin) GQLErrorHandler('This is a dev only resource', 'PERMISSION_DENIED', { reason: 'Dev only resource' })

  return resolve(source, args, context, info)
}

export { onlyDevMiddleware }
