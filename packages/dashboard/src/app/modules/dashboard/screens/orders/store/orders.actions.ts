import { createAction, props } from '@ngrx/store';
import { IOrder } from '../../../../shared/interfaces/order';

export enum actionTypes {
  getOrdersStats = '@orders/getOrdersStats',
  getOrdersStatsSuccess = '@orders/getOrdersStatsSuccess',
  getOrdersStatsError = '@orders/getOrdersStatsError',

  getOrders = '@orders/getOrders',
  getOrdersSuccess = '@orders/getOrdersSuccess',
  getOrdersError = '@orders/getOrdersError',

  getOrdersPage = '@orders/getOrdersPage',
  getOrdersPageSuccess = '@orders/getOrdersPageSuccess',
  getOrdersPageError = '@orders/getOrdersPageError',

  getOrderDetails = '@orders/getOrderDetails',
  getOrderDetailsSuccess = '@orders/getOrderDetailsSuccess',
  getOrderDetailsError = '@orders/getOrderDetailsError',

  setOrder = '@orders/setOrder',
  setOrderSuccess = '@orders/setOrderSuccess',
  setOrderError = '@orders/setOrderError',

  setKindFilter = '@orders/setKindFilter',

  resetOrders = '@orders/resetOrders',
}

export const resetOrders = createAction(actionTypes.resetOrders);
export const getOrders = createAction(actionTypes.getOrders);
export const setKindFilter = createAction(
  actionTypes.setKindFilter,
  props<{ kind: string }>()
);
export const getOrdersPage = createAction(actionTypes.getOrdersPage);
export const getOrdersPageSuccess = createAction(
  actionTypes.getOrdersPageSuccess
);

export const getOrdersSuccess = createAction(
  actionTypes.getOrdersSuccess,
  props<{
    orders: Partial<IOrder>[];
    totalOrders: number;
    totalPages: number;
    currentPage: number;
  }>()
);

export const getOrdersError = createAction(
  actionTypes.getOrdersError,
  props<{ error: string }>()
);

export const setCurrentOrder = createAction(actionTypes.setOrder);

export const setCurrentOrderSuccess = createAction(
  actionTypes.setOrderSuccess,
  props<{ order: Partial<IOrder> }>()
);

export const getOrderDetails = createAction(
  actionTypes.getOrderDetails,
  props<{ id: string | undefined }>()
);

export const getOrderDetailsSuccess = createAction(
  actionTypes.getOrderDetailsSuccess,
  props<{ order: IOrder }>()
);

export const getOrderDetailsError = createAction(
  actionTypes.getOrderDetailsError,
  props<{ error: string }>()
);

export const getOrdersStats = createAction(actionTypes.getOrdersStats);
export const getOrdersStatsSuccess = createAction(
  actionTypes.getOrdersStatsSuccess,
  props<{
    stats: Record<string, number>;
  }>()
);

export const getOrdersStatsError = createAction(
  actionTypes.getOrdersStatsError,
  props<{ error: string }>()
);
