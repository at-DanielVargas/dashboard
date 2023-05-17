import { createReducer, on } from '@ngrx/store';
import { IHomeState } from './home.state';
import {
  getSellsProfitSuccess,
  getTopSellsSuccess,
  resetHomeState,
} from './home.actions';
import { OrderLabel } from '../../../../shared/constants';

export const initialState: IHomeState = {
  tops: [],
  sells: 0,
  products: 0,
  profit: 0,
  errors: undefined,
};

export const homeReducer = createReducer(
  initialState,
  on(getTopSellsSuccess, (state, action) => ({
    ...state,
    tops: action.top,
  })),
  on(getSellsProfitSuccess, (state, action) => ({
    ...state,
    profit: action.profit,
    sells: action.sells,
    products: action.products,
  })),
  on(resetHomeState, (state, action) => ({ ...state, ...initialState }))
);
