import { GQLErrorHandler } from '@ersanyamarya/server-essentials'
import { IWorkspace, RoleModel, WorkspaceModel } from '@the-long-chain/blaze-mongo'
import { schemaComposer } from 'graphql-compose'
import { composeMongoose } from 'graphql-compose-mongoose'
import { AuthMiddlewareContext, authMiddleware } from '../../middleware'
import RoleResource from '../role'
import UserResource from '../user'
import { getAggregation, getBaseQuery } from './utils'

const WorkspaceTC = composeMongoose<IWorkspace>(WorkspaceModel, {})

const WorkspaceQuotaInfo = schemaComposer.createObjectTC({
  name: 'WorkspaceQuotaInfo',
  fields: {
    total: {
      type: 'Int',
    },
    used: {
      type: 'Int',
    },
    remaining: {
      type: 'Int',
    },
  },
})

const WorkspaceAllMembers = schemaComposer.createObjectTC({
  name: 'WorkspaceAllMembers',
  fields: {
    user: {
      type: UserResource.ResourceTC,
      removeFields: ['password'],
    },
    role: {
      type: RoleResource.ResourceTC,
    },
  },
})

WorkspaceTC.addFields({
  allMembers: {
    type: [WorkspaceAllMembers],
    resolve: async ({ members }) => {
      const data = await Promise.all(
        members.map(({ user, role }) => {
          return Promise.all([UserResource.ResourceModel.findById(user), RoleResource.ResourceModel.findById(role)])
        })
      )
      return data.map(([user, role]) => ({ user, role }))
    },
  },
  myPermissions: {
    type: RoleResource.ResourceTC,
    resolve: async ({ members }, _, context) => {
      const { userID } = context as AuthMiddlewareContext

      const member = members.find(m => m.user.toString() === userID.toString())
      if (!member) {
        return null
      }
      return RoleResource.ResourceModel.findById(member.role)
    },
  },
  quotaDetails: {
    type: schemaComposer.createObjectTC({
      name: 'WorkspaceQuotaDetails',
      fields: {
        members: WorkspaceQuotaInfo,
        topics: WorkspaceQuotaInfo,
      },
    }),
    resolve: async ({ _id }) => {
      const workspace = await WorkspaceModel.findById(_id)
      if (!workspace) return null
      const memberCount = workspace.members.length
      //  TODO: add topics count
      // const deviceCount = await DeviceResource.ResourceModel.countDocuments({ workspaceId: _id })
      const quota = workspace.quota
      return {
        members: {
          total: quota.members,
          used: memberCount,
          remaining: quota.members - memberCount,
        },
        topics: {
          total: quota.topics,
          used: 0,
          remaining: quota.topics,
        },
      }
    },
  },
})

WorkspaceTC.addResolver({
  kind: 'mutation',
  name: 'workspaceCreate',
  args: {
    name: 'String!',
  },
  type: WorkspaceTC,
  resolve: async ({ args, context }) => {
    const { name } = args
    const { user, userID } = context as AuthMiddlewareContext
    const workspaceCount = await WorkspaceModel.countDocuments({
      members: {
        $elemMatch: {
          user: userID,
        },
      },
    })
    if (workspaceCount >= user.quota.workspace)
      GQLErrorHandler('User cannot add anymore workspace', 'QUOTA_EXCEEDED', { location: 'workspaceCreate', userID })

    const role = await RoleModel.findOne({ name: 'Admin' })

    if (!role)
      GQLErrorHandler('Admin role not found, contact the developer', 'INVALID_PERMISSION', {
        location: 'workspaceCreate',
      })

    try {
      const workspace = await WorkspaceModel.create({
        name,
        members: [{ user, role: role._id }],
      })
      return workspace
    } catch (error) {
      GQLErrorHandler('Workspace already exists', 'DUPLICATE_RESOURCE', {
        location: 'workspaceCreate',
        name,
        userID,
      })
    }
  },
})

WorkspaceTC.addResolver({
  kind: 'mutation',
  name: 'workspaceInfoUpdate',
  args: {
    id: 'MongoID!',
    record: WorkspaceTC.getITC().removeField(['_id', 'createdAt', 'updatedAt', 'members', 'quota']),
  },
  type: WorkspaceTC,
  resolve: async ({ args, context }) => {
    const { id, record } = args
    const { userID } = context as AuthMiddlewareContext
    const workspace = await WorkspaceModel.findById(id)
    if (!workspace) GQLErrorHandler('Workspace not found', 'NOT_FOUND', { location: 'workspaceUpdate', id, userID })
    const isAllowed = await workspace.isMemberAllowedTo(userID, 'workspaceInfoUpdate')
    if (!isAllowed)
      GQLErrorHandler('User not allowed to update workspace', 'INVALID_PERMISSION', {
        location: 'workspaceUpdate',
        id,
        userID,
      })
    try {
      return await WorkspaceModel.findByIdAndUpdate(
        id,
        {
          ...record,
          updatedAt: new Date(),
        },
        {
          new: true,
        }
      )
    } catch (error) {
      GQLErrorHandler(error.message, 'UNKNOWN', {
        location: 'workspaceUpdate',
        error,
      })
    }
  },
})

const EnumWorkspaceSortType = schemaComposer.createEnumTC({
  name: 'EnumWorkspaceSortType',
  values: {
    NAME: { value: 'name' },
    CREATED_AT: { value: 'createdAt' },
    UPDATED_AT: { value: 'updatedAt' },
  },
})

const GroupWorkspacesType = schemaComposer.createObjectTC({
  name: 'GroupWorkspacesType',
  fields: {
    workspaces: [WorkspaceTC],
    status: 'String',
  },
})

const WorkspacePaginationResponseType = schemaComposer.createObjectTC({
  name: 'WorkspacePaginationResponseType',
  fields: {
    count: 'Int',
    list: [GroupWorkspacesType],
    hasNextPage: 'Boolean',
    pages: 'Int',
  },
})

WorkspaceTC.addResolver({
  kind: 'query',
  name: 'workspacePagination',
  args: {
    searchString: {
      type: 'String',
      defaultValue: '',
    },
    sortOrder: {
      type: 'EnumSortOrder',
      defaultValue: -1,
    },
    sortBy: {
      type: EnumWorkspaceSortType,
      defaultValue: 'updatedAt',
    },
    page: {
      type: 'Int',
      defaultValue: 1,
    },
    pageSize: {
      type: 'Int',
      defaultValue: 10,
    },
  },
  type: WorkspacePaginationResponseType,
  resolve: async ({ args, context }) => {
    const { page, pageSize, sortBy, sortOrder } = args
    const skip = (page - 1) * pageSize
    try {
      const query = await getBaseQuery(args, context)
      const aggregation = await getAggregation(args, context)
      const count = await WorkspaceModel.countDocuments(query)

      const list = await WorkspaceModel.aggregate([
        ...aggregation,
        {
          $sort: { [`workspaces.${sortBy}`]: sortOrder },
        },
        {
          $skip: skip > 0 ? skip : 0,
        },
        {
          $limit: pageSize,
        },
      ]).sort({ status: 1 })

      const hasNextPage = page * pageSize < count

      return {
        count,
        // workspaces,
        list,
        hasNextPage,
        pages: Math.ceil(count / pageSize),
      }
    } catch (error) {
      GQLErrorHandler(error.message, 'UNKNOWN', {
        location: 'Workspace pagination',
        error,
        page,
        pageSize,
        sortBy,
        sortOrder,
      })
    }
  },
})

WorkspaceTC.addResolver({
  kind: 'query',
  name: 'workspaceList',
  args: {
    searchString: {
      type: 'String',
      defaultValue: '',
    },
    sortOrder: {
      type: 'EnumSortOrder',
      defaultValue: -1,
    },
    sortBy: {
      type: EnumWorkspaceSortType,
      defaultValue: 'updatedAt',
    },
  },
  type: [WorkspaceTC],
  resolve: async ({ args, context }) => {
    const { sortBy, sortOrder } = args
    try {
      const query = await getBaseQuery(args, context)

      return WorkspaceModel.find(query).sort({ [sortBy]: sortOrder })
    } catch (error) {
      GQLErrorHandler(error.message, 'UNKNOWN', {
        location: 'Workspace list',
        error,
        sortBy,
        sortOrder,
      })
    }
  },
})

WorkspaceTC.addResolver({
  kind: 'query',
  name: 'workspaceGetOne',
  args: {
    id: 'MongoID!',
  },
  type: WorkspaceTC,
  resolve: async ({ args, context }) => {
    const { id } = args
    const { userID } = context as AuthMiddlewareContext
    const workspace = await WorkspaceModel.findById(id)
    if (!workspace) GQLErrorHandler('Workspace not found', 'NOT_FOUND', { location: 'workspaceGetOne', id, userID })
    if (!workspace.isAMember(userID))
      GQLErrorHandler('User not a member of workspace', 'INVALID_PERMISSION', { location: 'workspaceGetOne', id, userID })
    return workspace
  },
})
WorkspaceTC.addResolver({
  kind: 'mutation',
  name: 'workspaceKeyGenerated',
  args: {
    id: 'MongoID!',
    keyGenerated: 'Boolean!',
  },
  type: WorkspaceTC,
  resolve: async ({ args, context }) => {
    const { id, keyGenerated } = args
    const { userID } = context as AuthMiddlewareContext
    const workspace = await WorkspaceModel.findById(id)
    if (!workspace) GQLErrorHandler('Workspace not found', 'NOT_FOUND', { location: 'workspaceGetOne', id, userID })
    const isAllowed = await workspace.isMemberAllowedTo(userID, 'workspaceInfoUpdate')
    if (!isAllowed)
      GQLErrorHandler('User not allowed to update workspace', 'INVALID_PERMISSION', {
        location: 'workspaceUpdate',
        id,
        userID,
      })
    try {
      return await WorkspaceModel.findByIdAndUpdate(id, { keyGenerated }, { new: true })
    } catch (error) {
      GQLErrorHandler(error.message, 'UNKNOWN', {
        location: 'workspaceUpdate',
        error,
      })
    }
  },
})

const queries = {
  workspacePagination: WorkspaceTC.getResolver('workspacePagination').withMiddlewares([authMiddleware]),
  workspaceList: WorkspaceTC.getResolver('workspaceList').withMiddlewares([authMiddleware]),
  workspaceGetOne: WorkspaceTC.getResolver('workspaceGetOne').withMiddlewares([authMiddleware]),
}

const mutations = {
  workspaceCreate: WorkspaceTC.getResolver('workspaceCreate').withMiddlewares([authMiddleware]),
  workspaceInfoUpdate: WorkspaceTC.getResolver('workspaceInfoUpdate').withMiddlewares([authMiddleware]),
  workspaceKeyGenerated: WorkspaceTC.getResolver('workspaceKeyGenerated').withMiddlewares([authMiddleware]),
}

export default {
  ResourceTC: WorkspaceTC,
  queries,
  mutations,
  ResourceModel: WorkspaceModel,
  name: 'Workspace',
}
