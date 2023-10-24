import { Document, Schema, model } from 'mongoose'

const topicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    workspaceId: {
      type: Schema.Types.ObjectId,
      ref: 'Workspace',
    },
    content: {
      type: [
        {
          kind: {
            type: String,
            enum: ['blog', 'post'],
            required: true,
          },
          data: {
            type: String,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
)
  .index({ name: 1, workspace: 1 }, { unique: true })
  .index({ '$**': 'text' })
export interface ITopic extends Document {
  name: string
  workspaceId: string
  content: {
    kind: string
    data: string
  }[]
}

const TopicModel = model<ITopic>('Topic', topicSchema)

export { TopicModel }
