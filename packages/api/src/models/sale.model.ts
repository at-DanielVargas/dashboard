import autopopulate from 'mongoose-autopopulate'
import mongoosePaginate from 'mongoose-paginate-v2'
import { PaginateModel, Schema, model } from 'mongoose'
import { Shape } from '../interfaces'
import { array, date, mixed, number, object, string } from 'yup'

export interface ISale {
  client: any
  status: string
  products: any
  paginate?: PaginateModel<ISale>
  store: any
  createdAt: any
  updatedAt?: any
}

export enum ESaleStatus {
  DUE = 'due',
  PAYED = 'payed',
  PENDING = 'pending',
  CANCELLED = 'cancelled'
}

const SaleSchema = new Schema<ISale>({
  status: {
    type: Schema.Types.String,
    enum: ESaleStatus,
    default: ESaleStatus.DUE
  },
  products: [
    {
      item: { type: Schema.Types.ObjectId, ref: 'products', autopopulate: {select: 'price name sku'} },
      quantity: Schema.Types.Number
    }
  ],
  client: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    autopopulate: { select: 'firstname lastname email' }
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'stores',
    autopopulate: true
  }
}, {timestamps: true, versionKey: false})

SaleSchema.plugin(mongoosePaginate)
SaleSchema.plugin(autopopulate)

interface SaleDocument extends Document, ISale {}

export const SaleModel = model<SaleDocument, PaginateModel<SaleDocument>>('sales', SaleSchema)

export const CreateSaleDto = object().shape<Shape<ISale>>({
  client: string().required(),
  status: string().optional(),
  store: string(),
  products: array(object().shape({
    item: mixed().required(),
    quantity: number().positive().required()
  })).required().min(1),
  createdAt: date()
})
