import { IStatus } from '../../../../shared/components/status-group/status-group.component';
import { IPaginatedResponse } from '../../../../shared/interfaces/app';
import { IOrder } from '../../../../shared/interfaces/order';

export interface IOrdersState extends IPaginatedResponse<IOrder> {
  kindFilter: string;
  stats: IStatus[] | undefined;
  currentOrder: IOrder | undefined;
  errors: any;
}
