import { model, Schema } from 'mongoose';

export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    firstname: {
      type: Schema.Types.String,
      required: true,
    },
    lastname: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const UserModel = model('users', UserSchema);
