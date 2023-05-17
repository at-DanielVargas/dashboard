import { createReducer, on } from '@ngrx/store';
import { IDashboardState } from './dashboard.state';
import {
  getOrderDetailsSuccess,
  
  getOrdersSuccess,
  resetOrders,
} from './dashboard.actions';

export const initialState: IDashboardState = {
  orders: [],
  totalOrders: 0,
  currentOrder: undefined,
  totalPages: 0,
  currentPage: 1,
  errors: undefined,
};

export const dashboardReducer = createReducer(
  initialState,
  on(getOrdersSuccess, (state, action) => ({
    ...state,
    orders: [...state.orders, ...action.orders],
    totalOrders: action.totalOrders,
    totalPages: action.totalPages,
    currentPage:
      state.currentPage < action.totalPages
        ? state.currentPage + 1
        : state.currentPage,
  })),
  on(getOrderDetailsSuccess, (state, action) => ({
    ...state,
    currentOrder: action.order,
  })),

  on(resetOrders, (state, action) => ({ ...state, ...initialState }))
);
