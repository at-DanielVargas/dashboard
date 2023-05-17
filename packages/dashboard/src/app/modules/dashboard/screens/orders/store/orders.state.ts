import { IStatus } from '../../../../shared/components/status-group/status-group.component';
import { IOrder } from '../../../../shared/interfaces/order';

export interface IOrdersState {
  kindFilter: string;
  stats: IStatus[] | undefined;
  orders: Partial<IOrder>[];
  totalOrders: number;
  totalPages: number;
  currentPage: number;
  currentOrder: IOrder | undefined;
  errors: any;
}
