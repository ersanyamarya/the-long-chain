import { GQLErrorHandler } from '@ersanyamarya/server-essentials'
import { RoleModel } from '@the-long-chain/blaze-mongo'
import { PipelineStage } from 'mongoose'
import { AuthMiddlewareContext } from '../../middleware'

export async function getBaseQuery(args: { searchString: string }, context: AuthMiddlewareContext) {
  const { userID } = context
  const { searchString } = args
  const $regex = new RegExp(searchString, 'i')

  return {
    $and: [
      { name: { $regex } },
      {
        members: {
          $elemMatch: {
            user: userID,
          },
        },
      },
    ],
  }
}

export async function getAggregation(
  args: { searchString: string },
  context: AuthMiddlewareContext
): Promise<PipelineStage[]> {
  const { userID } = context
  const $match = await getBaseQuery(args, context)
  const pendingRole = await RoleModel.findOne({ name: 'Pending' }, { _id: 1 })
  if (!pendingRole)
    GQLErrorHandler('Pending role not found, contact the developer', 'UNKNOWN', {
      location: 'Workspace getWorkspacesGroupByPendingAndRestRoles',
    })
  const pendingRoleID = pendingRole._id
  return [
    {
      $match,
    },
    {
      $set: {
        member: {
          $arrayElemAt: [
            {
              $filter: {
                input: '$members',
                as: 'member',
                cond: { $eq: ['$$member.user', userID] },
              },
            },
            0,
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          $cond: {
            if: { $eq: ['$member.role', pendingRoleID] },
            then: 'pending',
            else: 'active',
          },
        },
        workspaces: {
          $push: '$$ROOT',
        },
      },
    },

    {
      $project: {
        status: '$_id',
        _id: 0,
        workspaces: 1,
      },
    },
  ]
}
