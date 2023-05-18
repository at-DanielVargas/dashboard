import autopopulate from 'mongoose-autopopulate';
import mongoosePaginate from 'mongoose-paginate-v2';
import { model, PaginateModel, Schema } from 'mongoose';

export interface ICategory {
  name: string;
  description: string;
  paginate?: PaginateModel<ICategory>;
}

const CategorySchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    description: {
      type: Schema.Types.String,
    },
  },
  { timestamps: false, versionKey: false }
);

CategorySchema.plugin(mongoosePaginate);
CategorySchema.plugin(autopopulate);

interface CategoryDocument extends Document, ICategory {}

export const CategoryModel = model<
  CategoryDocument,
  PaginateModel<CategoryDocument>
>('categories', CategorySchema);
