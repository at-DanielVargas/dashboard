import { createReducer, on } from '@ngrx/store';
import { IOrdersState } from './orders.state';
import {
  getOrderDetailsSuccess,
  getOrdersPage,
  getOrdersSuccess,
  resetOrders,
} from './orders.actions';

export const initialState: IOrdersState = {
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

  on(resetOrders, (state, action) => ({ ...state, ...initialState }))
);
