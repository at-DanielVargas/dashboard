import { createAction, props } from '@ngrx/store';

import { IProduct } from '../../../../shared/interfaces/product';

export enum actionTypes {
  getTopSells = '@home/getTopSells',
  getTopSellsSuccess = '@home/getTopSellsSuccess',
  getTopSellsError = '@home/getTopSellsError',

  getSellsProfit = '@home/getSellsProfit',
  getSellsProfitSuccess = '@home/getSellsProfitSuccess',
  getSellsProfitError = '@home/getSellsProfitError',

  resetHomeState = '@home/resetOrders',
}

export const getTopSells = createAction(actionTypes.getTopSells);
export const getSellsProfit = createAction(actionTypes.getSellsProfit);

export const resetHomeState = createAction(actionTypes.resetHomeState);

export const getTopSellsSuccess = createAction(
  actionTypes.getTopSellsSuccess,
  props<{
    top: IProduct[];
  }>()
);

export const getSellsProfitSuccess = createAction(
  actionTypes.getSellsProfitSuccess,
  props<{
    profit: number;
    sells: number;
    products: number;
  }>()
);

export const getSellsProfitError = createAction(
  actionTypes.getSellsProfitError,
  props<{ error: string }>()
);
