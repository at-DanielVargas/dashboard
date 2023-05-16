import mongoosePaginate from 'mongoose-paginate-v2';
import { model, Schema, Document, PaginateModel } from 'mongoose';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export interface IProduct {
  name: string;
  description: string;
  sku: string;
  price: number;
  supplierPrice: number;
  purchases: number;
  category?: any;
  paginate?: PaginateModel<IProduct>;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
    },
    sku: {
      type: Schema.Types.String,
      required: true,
    },
    price: {
      type: Schema.Types.Number,
      required: true,
    },
    supplierPrice: {
      type: Schema.Types.Number,
      required: true,
    },
    purchases: {
      type: Schema.Types.Number,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
    },
  },
  { timestamps: true, versionKey: false }
);

ProductSchema.plugin(mongoosePaginate);

interface ProductDocument extends Document, IProduct {}

export const ProductModel = model<
  ProductDocument,
  PaginateModel<ProductDocument>
>('products', ProductSchema);

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly sku: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  readonly supplierPrice: number;

  @IsNumber()
  purchases: number;

  @IsString()
  category?: any;
}
