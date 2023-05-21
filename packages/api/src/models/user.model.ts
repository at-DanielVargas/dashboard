import { model, Schema } from 'mongoose'
import { object, string } from 'yup'
import { Shape } from '../interfaces'
import { hashSync } from 'bcrypt'

export interface IUser {
  firstname: string
  lastname: string
  email: string
  password: string
}

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
    }
  },
  { timestamps: false, versionKey: false }
)

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()

  this.password = hashSync(this.password, 10)
  next()
})

export const UserModel = model('users', UserSchema)

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
export const CreateUserDto = object().shape<Shape<IUser>>({
  firstname: string().required(),
  lastname: string().required(),
  email: string().required().email().min(8),
  password: string().required().matches(passwordRules, { message: 'Please create a stronger password' })
})
