import mongoosePaginate from 'mongoose-paginate-v2'
import autopopulate from 'mongoose-autopopulate'
import { model, PaginateModel, Schema } from 'mongoose'

export interface IOrder {
  kind: string
  status: string
  sendTracking: any
  collectTracking: any
  createdAt: Date
  updatedAt: Date
}

export enum EOrderKind {
  REFUND = 'refund',
  CANCELLATION = 'cancellation',
  WARRANTY = 'warranty',
  ADDITION = 'addition',
  PROMO = 'promo',
  DELIVERY = 'delivery',
  COLLECT = 'collect'
}

export enum EOrderStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PENDING = 'pending'
}

const OrderSchema = new Schema<IOrder>(
  {
    kind: {
      type: Schema.Types.String,
      required: true
    },
    status: {
      type: Schema.Types.String,
      required: true
    },
    sendTracking: {
      type: Schema.Types.ObjectId,
      ref: 'tracking',
      autopopulate: true
    },
    collectTracking: {
      type: Schema.Types.ObjectId,
      ref: 'tracking',
      autopopulate: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

OrderSchema.plugin(mongoosePaginate)
OrderSchema.plugin(autopopulate)

interface OrderDocument extends Document, IOrder {}

export const OrderModel = model<OrderDocument, PaginateModel<OrderDocument>>('orders', OrderSchema)