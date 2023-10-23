import { logger } from '@the-long-chain/utils'
import { Document, model, Schema, Types } from 'mongoose'
import { getResourceAndActionFromFieldName } from '../utils'
import { RoleModel } from './role'

const MemberSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
    role: {
      type: Types.ObjectId,
      ref: 'Role',
    },
  },
  {
    _id: false,
  }
)

const WorkspaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pictureUrl: String,
    members: [MemberSchema],
    quota: {
      members: {
        type: Number,
        default: 3,
      },
      topics: {
        type: Number,
        default: 3,
      },
    },
    keyGenerated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
)
  .index({ name: 1, 'members.user': 1 }, { unique: true })
  .index({ createdAt: 1 })
  .index({ updatedAt: 1 })

WorkspaceSchema.methods = {
  isMemberAllowedTo: async function (userId: Types.ObjectId, fieldName: string): Promise<boolean> {
    try {
      const { resource, action } = getResourceAndActionFromFieldName(fieldName)
      const roleID = this.members.find(m => m.user.toString() === userId.toString()).role

      if (!roleID) return false
      const permissions = await (await RoleModel.findById(roleID)).permissions[resource]

      if (!permissions) return false
      console.log({ permissions, action, actionInPermissions: permissions[action] })
      logger.info(`
        resource: ${resource}
        action: ${action}
        permissions: ${JSON.stringify(permissions)}
        action in permissions: ${permissions[action] ?? false}
      `)
      return permissions[action] ?? false
    } catch (error) {
      logger.error(error)
      return false
    }
  },
  canAddMembers: function (): boolean {
    return this.members.length < this.quota.members
  },
  isAMember: function (userId: Types.ObjectId): boolean {
    return this.members.some(m => m.user.toString() === userId.toString())
  },
  userRole: async function (userId: Types.ObjectId): Promise<string> {
    const roleID = this.members.find(m => m.user.toString() === userId.toString()).role
    const role = await RoleModel.findById(roleID)
    return role.name
  },
}

export interface IWorkspace extends Document {
  name: string
  pictureUrl: string
  members: {
    user: Types.ObjectId
    role: Types.ObjectId
  }[]
  quota: {
    members: number
    topics: number
  }
  keyGenerated: boolean
  createdAt: Date
  updatedAt: Date
  isMemberAllowedTo(userId: Types.ObjectId, fieldName: string): Promise<boolean>
  canAddMembers(): boolean
  isAMember(userId: Types.ObjectId): boolean
  userRole(userId: Types.ObjectId): Promise<string>
}

const WorkspaceModel = model<IWorkspace>('Workspace', WorkspaceSchema)

export { WorkspaceModel }
