import autopopulate from 'mongoose-autopopulate'
import mongoosePaginate from 'mongoose-paginate-v2'
import { model, PaginateModel, Schema } from 'mongoose'
import { array, object, string } from 'yup'
import { Shape } from '../interfaces'
import { hashSync } from 'bcrypt'

export interface IUser {
  firstname: string
  lastname: string
  email: string
  password: string
  permissions: any
  paginate?: PaginateModel<IUser>
}

export type ICredentials = Pick<IUser, 'email' | 'password'>

const UserSchema = new Schema<IUser>(
  {
    firstname: {
      type: Schema.Types.String,
      required: true
    },
    lastname: {
      type: Schema.Types.String,
      required: true
    },
    email: {
      type: Schema.Types.String,
      unique: true
    },
    password: {
      type: Schema.Types.String,
      required: true
    },
    permissions: [
      {
        type: Schema.Types.String
      }
    ]
  },
  { timestamps: false, versionKey: false }
)

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  this.password = hashSync(this.password, 10)
  next()
})

UserSchema.plugin(mongoosePaginate)
UserSchema.plugin(autopopulate)

interface UserDocument extends Document, IUser {}

export const UserModel = model<UserDocument, PaginateModel<UserDocument>>('users', UserSchema)

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
export const CreateUserDto = object().shape<Shape<IUser>>({
  firstname: string().required(),
  lastname: string().required(),
  email: string().required().email().min(8),
  password: string().required().matches(passwordRules, { message: 'Please create a stronger password' }),
  permissions: array().of(string()).required()
})
