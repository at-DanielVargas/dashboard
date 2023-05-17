import { IClient } from './app';
import { IProduct } from './product';
import { ITracking } from './tracking';

export enum EOrderKind {
  REFUND = 'refund',
  CANCELLATION = 'cancellation',
  WARRANTY = 'warranty',
  ADDITION = 'addition',
  PROMO = 'promo',
  SALE = 'sale',
}

export interface IOrder {
  _id?: string;
  kind: string;
  status: string;
  items: IOrderItem[];
  client: IClient;
  createdAt: string;
  updatedAt: string;
  sendTracking?: ITracking;
  collectTracking?: ITracking;
}

export interface IOrderItem {
  _id?: string;
  item: IProduct;
  quantity: number;
}
