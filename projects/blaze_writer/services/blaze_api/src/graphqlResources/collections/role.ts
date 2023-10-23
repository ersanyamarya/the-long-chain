import { IRole, RoleModel } from '@the-long-chain/blaze-mongo'
import { composeMongoose } from 'graphql-compose-mongoose'
import { onlyDevMiddleware } from '../middleware'
import { genSchemaGeneric } from '../schemaGenerator'

const RoleTC = composeMongoose<IRole>(RoleModel, {})
const { queries, mutations } = genSchemaGeneric('Role', RoleTC, [], [onlyDevMiddleware])

export default {
  ResourceTC: RoleTC,
  queries: { ...queries },
  mutations: { ...mutations },
  ResourceModel: RoleModel,
  name: 'Role',
}
