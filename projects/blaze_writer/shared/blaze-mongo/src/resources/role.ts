import { Document, model, Schema } from 'mongoose'

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: 'person',
    },
    color: {
      type: String,
      default: '#339900',
    },
    permissions: {
      workspace: {
        InfoUpdate: {
          type: Boolean,
          default: false,
        },
        MemberInvite: {
          type: Boolean,
          default: false,
        },
        ChangeRole: {
          type: Boolean,
          default: false,
        },
        Delete: {
          type: Boolean,
          default: false,
        },
        MembersRemove: {
          type: Boolean,
          default: false,
        },
      },
      topic: {
        Create: {
          type: Boolean,
          default: false,
        },
        Update: {
          type: Boolean,
          default: false,
        },
        Delete: {
          type: Boolean,
          default: false,
        },
      },
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
).index({ name: 1 }, { unique: true })

RoleSchema.methods = {
  isPermitted: function (resource: string, action: string): boolean {
    return this.permissions[resource][action] ?? true
  },
}
export interface IRole extends Document {
  name: string
  icon: string
  permissions: {
    workspace: {
      InfoUpdate: boolean
      ChangeRole: boolean
      Delete: boolean
      MemberInvite: boolean
      MembersRemove: boolean
    }
    topic: {
      Create: boolean
      Update: boolean
      Delete: boolean
    }
  }
}

const RoleModel = model<IRole>('Role', RoleSchema, 'roles')

export { RoleModel }
