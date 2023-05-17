import { createReducer, on } from '@ngrx/store';
import { IOrdersState } from './orders.state';
import {
  getOrderDetailsSuccess,
  getOrdersPage,
  getOrdersStatsSuccess,
  getOrdersSuccess,
  resetOrders,
  setKindFilter,
} from './orders.actions';
import { OrderLabel } from '../../../../shared/constants';

export const initialState: IOrdersState = {
  kindFilter: 'refund',
  stats: undefined,
  orders: [],
  totalOrders: 0,
  currentOrder: undefined,
  totalPages: 0,
  currentPage: 1,
  errors: undefined,
};

export const ordersReducer = createReducer(
  initialState,
  on(getOrdersSuccess, (state, action) => ({
    ...state,
    orders: action.orders,
    totalOrders: action.totalOrders,
    totalPages: action.totalPages,
    currentPage: action.currentPage,
  })),
  on(getOrderDetailsSuccess, (state, action) => ({
    ...state,
    currentOrder: action.order,
  })),
  on(getOrdersPage, (state, action) => {
    const currentPage =
      state.currentPage < state.totalPages
        ? state.currentPage + 1
        : state.currentPage;
    return {
      ...state,
      currentPage,
    };
  }),

  on(setKindFilter, (state, action) => ({ ...state, kindFilter: action.kind })),

  on(getOrdersStatsSuccess, (state, action) => {
    const stats = Object.entries(action.stats).map(([key, value]) => ({
      count: String(value),
      label: OrderLabel[key],
      key,
    }));

    return {
      ...state,
      stats,
    };
  }),

  on(resetOrders, (state, action) => ({ ...state, ...initialState }))
);
