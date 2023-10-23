import { Document, Schema, model } from 'mongoose'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    quota: {
      workspace: {
        type: Number,
        default: 2,
      },
    },
    fireBaseAuthID: {
      type: String,
      default: '',
    },
    deleteRequest: {
      token: {
        type: String,
        default: '',
      },
      expiresAt: {
        type: Date,
        default: null,
      },
      reason: {
        type: String,
        default: '',
      },
    },
    lastLogin: {
      type: Date,
      default: new Date(),
    },
    developer: {
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
  .index({ email: 1 }, { unique: true })
  .index({ name: 'text', email: 'text' })

export interface IUser extends Document {
  name: string
  email: string
  quota: {
    workspace: number
  }
  fireBaseAuthID: string
  deleteRequest: {
    token: string
    expiresAt: Date
    reason: string
  }
  lastLogin: Date
  createdAt: Date
  updatedAt: Date
  _id: string
}

export const UserModel = model<IUser>('User', UserSchema)
