import mongoosePaginate from 'mongoose-paginate-v2';
import autopopulate from 'mongoose-autopopulate';
import { model, PaginateModel, Schema } from 'mongoose';

export interface IOrder {
  kind: string;
  status: string;
  sendTracking: any;
  collectTracking: any;
  createdAt: Date;
  updatedAt: Date;
}

export enum EOrderKind {
  REFUND = 'refund',
  CANCELLATION = 'cancellation',
  WARRANTY = 'warranty',
  ADDITION = 'addition',
  PROMO = 'promo',
  DELIVERY = 'delivery',
  COLLECT = 'collect',
}

export enum EOrderStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PENDING = 'pending',
}

/**
 * La orden se genera por cada venta, dependiendo del estatus de la venta
 * 1.- si la venta esta totalmente pagada en automatico se genera una orden de tipo DELIVERY para realizar el envio de los items comprados al cliente, en este punto se debe solicitar una guia de recoleccion para el envio de 
 * 
 * 2.- si la venta es cancelada, se debe modificar la orden generada en la venta
 * 
 * 3.- 
 */
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
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
