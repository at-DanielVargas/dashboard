import { IOrder } from '../../../../shared/interfaces/order';

export interface IOrdersState {
  orders: Partial<IOrder>[];
  totalOrders: number;
  totalPages: number;
  currentPage: number;
  currentOrder: IOrder | undefined;
  errors: any;
}
