import autopopulate from 'mongoose-autopopulate'
import mongoosePaginate from 'mongoose-paginate-v2'
import { model, PaginateModel, Schema } from 'mongoose'
import { array, object, string } from 'yup'
import { Shape } from '../interfaces'

export interface IRole {
  name: string
  description: string
  permissions: any
  paginate?: PaginateModel<IRole>
}

const RoleSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      unique: true,
      required: true
    },
    description: {
      type: Schema.Types.String
    },
    permissions: [
      {
        type: Schema.Types.String
      }
    ]
  },
  { timestamps: false, versionKey: false }
)

RoleSchema.plugin(mongoosePaginate)
RoleSchema.plugin(autopopulate)

interface RoleDocument extends Document, IRole {}

export const CategoryModel = model<RoleDocument, PaginateModel<RoleDocument>>('roles', RoleSchema)

export const CreateRoleDto = object().shape<Shape<IRole>>({
  name: string().required(),
  description: string().optional(),
  permissions: array().of(string()).required()
})
