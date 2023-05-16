import { model, Schema } from 'mongoose';

export interface ICategory {
  name: string;
  description: string;
}

const CategorySchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
    },
  },
  { timestamps: true, versionKey: false }
);

export const CategoryModel = model('categories', CategorySchema);
