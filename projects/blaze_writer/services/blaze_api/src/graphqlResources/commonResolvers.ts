/* eslint-disable @typescript-eslint/no-explicit-any */

import { logger } from '@the-long-chain/utils'
import { Model } from 'mongoose'

export default function customResolvers(model: Model<any>, TC: any, name: string, mutations: Record<string, unknown>): void {
  TC.addResolver({
    name: 'removeAll',
    type: 'Boolean',
    resolve: async () => {
      await model.deleteMany({}).catch(err => {
        logger.info(err)
        return false
      })
      return true
    },
  })
  mutations[`Admin${name}RemoveAll`] = TC.getResolver('removeAll').withMiddlewares([])
}
