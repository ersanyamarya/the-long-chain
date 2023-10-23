/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from '@the-long-chain/utils'
import { ObjectTypeComposerWithMongooseResolvers } from 'graphql-compose-mongoose'

import { Document } from 'mongoose'
type IReturn = {
  queries: Record<string, any>
  mutations: Record<string, any>
}

const findManyOptions = {
  limit: { defaultValue: 10000000 },
}

export function genSchemaGeneric<T extends Document<any, any, any>>(
  collection: string,
  TC: ObjectTypeComposerWithMongooseResolvers<T, any>,
  middlewares?: Array<(resolve: any, source: any, args: any, context: any, info: any) => Promise<any>>,
  mutationMiddlewares?: Array<(resolve: any, source: any, args: any, context: any, info: any) => Promise<any>>
): IReturn {
  logger.info(`--------> Preparing schema for ${collection} <--------`)
  collection = collection.toLowerCase()
  let queries: Record<string, any> = {}
  let mutations: Record<string, any> = {}

  if (!middlewares) middlewares = []
  if (!mutationMiddlewares) mutationMiddlewares = []

  queries = {
    [`${collection}Read`]: TC.mongooseResolvers.findById().withMiddlewares(middlewares),
    [`${collection}List`]: TC.mongooseResolvers.findMany(findManyOptions).withMiddlewares(middlewares),
    [`${collection}Count`]: TC.mongooseResolvers.count().withMiddlewares(middlewares),
    [`${collection}Pagination`]: TC.mongooseResolvers.pagination().withMiddlewares(middlewares),
  }

  mutations = {
    [`${collection}BatchCreate`]: TC.mongooseResolvers
      .createMany()
      .withMiddlewares([...middlewares, ...mutationMiddlewares]),
    [`${collection}Update`]: TC.mongooseResolvers.updateById().withMiddlewares([...middlewares, ...mutationMiddlewares]),
    [`${collection}Delete`]: TC.mongooseResolvers.removeById().withMiddlewares([...middlewares, ...mutationMiddlewares]),
    [`${collection}Create`]: TC.mongooseResolvers.createOne().withMiddlewares([...middlewares, ...mutationMiddlewares]),
  }

  return { queries, mutations }
}
