import { IHomeState } from '../../dashboard/screens/home/store/home.state';
import { IOrdersState } from '../../dashboard/screens/orders/store/orders.state';
import { IDashboardState } from '../../dashboard/store/dashboard.state';

export interface IAppState {
  dashboard: IDashboardState;
  orders: IOrdersState;
  home: IHomeState;
}

export interface IPaginatedResponse<T = any> {
  items: T[];
  total: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
}

export interface IClient {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
}


export type IPagination = Omit<IPaginatedResponse, 'items'>