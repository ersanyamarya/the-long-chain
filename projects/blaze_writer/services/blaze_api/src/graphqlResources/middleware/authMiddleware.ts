// eslint-disable-next-line @nx/enforce-module-boundaries

import { GQLErrorHandler } from '@ersanyamarya/server-essentials'
import { IUser, UserModel } from '@the-long-chain/blaze-mongo'
import { Types } from 'mongoose'

const authMiddleware = async (resolve, source, args, context, info) => {
  const { token, admin } = context
  if (admin) GQLErrorHandler('The request is not for admins', 'UNAUTHENTICATED', { reason: 'Developer is missing' })
  if (!token)
    GQLErrorHandler('Auth token missing', 'UNAUTHENTICATED', {
      reason: 'Token is missing',
      location: 'Auth Middleware',
    })

  const { email } = await getDataFromToken(token)

  if (!email)
    GQLErrorHandler('The request is UNAUTHENTICATED', 'UNAUTHENTICATED', {
      token,
      reason: 'email is missing',
      location: 'Auth Middleware',
    })
  // TODO: change according to requirements
  const user = await UserModel.findOne({ email }, { _id: 1, quota: 1 })
  if (!user)
    GQLErrorHandler('The request is UNAUTHENTICATED', 'UNAUTHENTICATED', {
      reason: 'User not found',
      location: 'Auth Middleware',
    })

  context.userID = user._id
  context.user = user

  return resolve(source, args, context, info)
}

const getDataFromToken = async (token: string): Promise<{ email: string }> => {
  try {
    // const decodedToken = await auth().verifyIdToken(token)
    // return { email: decodedToken.email }
    return { email: '' }
  } catch (error) {
    GQLErrorHandler('Error Decoding Token', 'UNAUTHENTICATED', {
      error,
      location: 'Auth Middleware',
    })
  }
}

type AuthMiddlewareContext = {
  token: string
  userID: Types.ObjectId
  user: IUser
}

export { authMiddleware }
export type { AuthMiddlewareContext }
