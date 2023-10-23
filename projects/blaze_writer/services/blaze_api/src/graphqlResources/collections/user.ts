import { IUser, UserModel } from '@the-long-chain/blaze-mongo'
import { composeMongoose } from 'graphql-compose-mongoose'
import { genSchemaGeneric } from '../schemaGenerator'

const UserTC = composeMongoose<IUser>(UserModel, {})
const { queries, mutations } = genSchemaGeneric<IUser>('User', UserTC)

// UserTC.addResolver({
//   kind: 'mutation',
//   name: 'userPostLoginCheck',
//   description: 'This is a post login check for the user ',
//   args: {},
//   type: UserTC,
//   resolve: async ({ context }) => {
//     const { token } = context as { token: string }
//     if (!token)
//       GQLErrorHandler('The token is missing', 'UNAUTHENTICATED', {
//         reason: 'Token is missing',
//         location: 'userPostLoginCheck',
//       })

//     const decodedToken = await auth().verifyIdToken(token)
//     if (!decodedToken.email)
//       GQLErrorHandler('The token is invalid', 'UNAUTHENTICATED', {
//         reason: 'Token is invalid',
//         location: 'userPostLoginCheck',
//       })
//     const user = await UserModel.findOneAndUpdate(
//       { email: decodedToken.email },
//       { $set: { lastLogin: new Date(), fireBaseAuthID: decodedToken.uid } },
//       { new: true }
//     )
//     if (user) return user
//     // Save picture using the file service replace('s96-c', 's400-c')
//     const newUser = await UserModel.create({
//       email: decodedToken.email,
//       name: decodedToken.name || decodedToken.email.split('@')[0],
//       fireBaseAuthID: decodedToken.uid,
//     })
//     return newUser
//   },
// })

export default {
  ResourceTC: UserTC,
  queries: { ...queries },
  mutations: { ...mutations },
  ResourceModel: UserModel,
  name: 'User',
}
