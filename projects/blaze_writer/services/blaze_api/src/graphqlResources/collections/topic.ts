import { TopicModel } from '@the-long-chain/blaze-mongo'
import { schemaComposer } from 'graphql-compose'
import { composeWithMongoose } from 'graphql-compose-mongoose'

import { GQLErrorHandler } from '@ersanyamarya/server-essentials'
import WorkspaceResource from './workspace'
const TopicTC = composeWithMongoose(TopicModel, {})

const EnumTopicSortType = schemaComposer.createEnumTC({
  name: 'EnumTopicSortType',
  values: {
    NAME: { value: 'name', description: 'Sort by name' },
    CREATED_AT: { value: 'createdAt', description: 'Sort by created at time' },
    UPDATED_AT: { value: 'updatedAt', description: 'Sort by updated at time' },
  },
})

const TopicPagination = schemaComposer.createObjectTC({
  name: 'TopicPagination',
  fields: {
    items: [TopicTC],
    hasNextPage: 'Boolean!',
    count: 'Int!',
    pages: 'Int!',
  },
})

TopicTC.addResolver({
  kind: 'query',
  name: 'topicPagination',
  description: 'This is a topic pagination',
  args: {
    page: {
      type: 'Int',
      defaultValue: 1,
    },
    pageSize: {
      type: 'Int',
      defaultValue: 10,
    },
    sortType: {
      type: EnumTopicSortType,
      defaultValue: 'updatedAt',
    },
    sortOrder: {
      type: 'EnumSortOrder',
      defaultValue: -1,
    },
    workspaceId: {
      type: 'MongoID',
      defaultValue: '',
    },
    searchString: {
      type: 'String',
      defaultValue: '',
    },
  },
  type: TopicPagination,
  resolve: async ({ args, context }) => {
    const { page, pageSize, sortBy, sortOrder } = args
    const skip = (page - 1) * pageSize
    const query = await getBaseQuery(args)
    const sort = { [sortBy]: sortOrder }
    const count = await TopicModel.countDocuments(query)

    const items = await TopicModel.find(query).sort(sort).skip(skip).limit(pageSize)

    return {
      items,
      count,
      hasNextPage: count > page * pageSize,
      pages: Math.ceil(count / pageSize),
    }
  },
})

// Topic List
TopicTC.addResolver({
  kind: 'query',
  name: 'topicList',
  description: 'This is a topic list',
  args: {
    workspaceId: {
      type: 'MongoID',
      defaultValue: '',
    },
    searchString: {
      type: 'String',
      defaultValue: '',
    },
  },
  type: [TopicTC],
  resolve: async ({ args, context }) => {
    const query = await getBaseQuery(args)
    const items = await TopicModel.find(query)
    return items
  },
})

const queries = {
  topicPagination: TopicTC.getResolver('topicPagination'),
  topicList: TopicTC.getResolver('topicList'),
}

export default {
  ResourceTC: TopicTC,
  queries,
  mutations: {},
  ResourceModel: TopicModel,
  name: 'Topic',
}

async function getBaseQuery(args: Record<string, any>) {
  const { searchString, workspaceId } = args
  const query = { $text: { $search: searchString } }
  if (workspaceId.toLowerCase() === 'all') return query

  const workspace = WorkspaceResource.ResourceModel.findById(workspaceId)
  if (!workspace) {
    GQLErrorHandler('Workspace not found', 'NOT_FOUND', {
      location: 'getBaseQuery',
      data: { workspaceId },
    })
  }

  return {
    ...query,
    workspaceId,
  }
}
