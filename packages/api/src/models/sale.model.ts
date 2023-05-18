import autopopulate from 'mongoose-autopopulate';
import mongoosePaginate from 'mongoose-paginate-v2';
import { PaginateModel, Schema, model } from 'mongoose';

export interface ISale {
  items: Omit<ISale, 'items'>[];
  client: any;
  paginate?: PaginateModel<ISale>;
  created_at: Date;
  updated_at: Date;
}

const SaleSchema = new Schema<ISale>({
  items: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'sale_item',
        autopopulate: true,
      },
    ],
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    autopopulate: { select: 'firstname lastname email' },
  },
});

SaleSchema.plugin(mongoosePaginate);
SaleSchema.plugin(autopopulate);

interface SaleDocument extends Document, ISale {}

export const SaleModel = model<SaleDocument, PaginateModel<SaleDocument>>(
  'orders',
  SaleSchema
);