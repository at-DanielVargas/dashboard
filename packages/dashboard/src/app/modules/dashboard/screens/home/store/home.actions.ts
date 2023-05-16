import { createAction, props } from '@ngrx/store';
import { IOrder } from '../../../../shared/interfaces/order';
import { IProduct } from '../../../../shared/interfaces/product';

export enum actionTypes {
  getOrdersStats = '@dashboard/getOrdersStats',
  getOrdersStatsSuccess = '@dashboard/getOrdersStatsSuccess',
  getOrdersStatsError = '@dashboard/getOrdersStatsError',

  getTopSells = '@dashboard/getTopSells',
  getTopSellsSuccess = '@dashboard/getTopSellsSuccess',
  getTopSellsError = '@dashboard/getTopSellsError',

  resetHomeState = '@dashboard/resetOrders',
}

export const getOrdersStats = createAction(actionTypes.getOrdersStats);
export const getTopSells = createAction(actionTypes.getTopSells);
export const resetHomeState = createAction(actionTypes.resetHomeState);

export const getTopSellsSuccess = createAction(
  actionTypes.getTopSellsSuccess,
  props<{
    top: IProduct[];
  }>()
);

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
