import mongoosePaginate from 'mongoose-paginate-v2';
import autopopulate from 'mongoose-autopopulate';
import { model, PaginateModel, Schema } from 'mongoose';

export interface IOrder {
  kind: string;
  status: string;
  items: any[];
  client: any;
  sendTracking: any;
  collectTracking: any;
  paginate?: PaginateModel<IOrder>;
}

export enum EOrderKind {
  REFUND = 'refund',
  CANCELLATION = 'cancellation',
  WARRANTY = 'warranty',
  ADDITION = 'addition',
  PROMO = 'promo',
  SALE = 'sale',
}

export enum EOrderStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PENDING = 'pending',
}

const OrderSchema = new Schema<IOrder>(
  {
    kind: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      required: true,
    },
    items: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'order_items',
          autopopulate: true,
        },
      ],
    },
    sendTracking: {
      type: Schema.Types.ObjectId,
      ref: 'tracking',
      autopopulate: true,
    },
    collectTracking: {
      type: Schema.Types.ObjectId,
      ref: 'tracking',
      autopopulate: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      autopopulate: { select: 'firstname lastname email' },
    },
  },
  { timestamps: true, versionKey: false }
);

OrderSchema.plugin(mongoosePaginate);
OrderSchema.plugin(autopopulate);

interface OrderDocument extends Document, IOrder {}

export const OrderModel = model<OrderDocument, PaginateModel<OrderDocument>>(
  'orders',
  OrderSchema
);

export interface IOrderItem {
  item: any;
  quantity: number;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      autopopulate: true,
    },
    quantity: { type: Schema.Types.Number },
  },
  { versionKey: false }
);

OrderItemSchema.plugin(autopopulate);

export const OrderItemModel = model('order_items', OrderItemSchema);
