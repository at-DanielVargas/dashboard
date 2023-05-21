import autopopulate from 'mongoose-autopopulate'
import mongoosePaginate from 'mongoose-paginate-v2'
import { model, Schema, Document, PaginateModel } from 'mongoose'
import { number, object, string } from 'yup'
import { Shape } from '../interfaces'

export interface IProduct {
  name: string
  description: string
  sku: string
  price: number
  supplierPrice: number
  purchases: number
  stock: number
  category?: any
  paginate?: PaginateModel<IProduct>
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true
    },
    description: {
      type: Schema.Types.String
    },
    sku: {
      type: Schema.Types.String,
      required: true
    },
    price: {
      type: Schema.Types.Number,
      required: true
    },
    supplierPrice: {
      type: Schema.Types.Number,
      required: true
    },
    purchases: {
      type: Schema.Types.Number
    },
    stock: {
      type: Schema.Types.Number
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      autopopulate: {
        select: 'name'
      }
    }
  },
  { timestamps: false, versionKey: false }
)

ProductSchema.plugin(mongoosePaginate)
ProductSchema.plugin(autopopulate)

interface ProductDocument extends Document, IProduct {}

export const ProductModel = model<ProductDocument, PaginateModel<ProductDocument>>('products', ProductSchema)

export const CreateProductDto = object().shape<Shape<IProduct>>({
  name: string().required(),
  description: string().optional(),
  sku: string().required(),
  price: number().required(),
  supplierPrice: number().required(),
  purchases: number().positive(),
  stock: number().required(),
  category: string().optional()
})
