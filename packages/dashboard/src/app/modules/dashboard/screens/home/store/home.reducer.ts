import { createReducer, on } from '@ngrx/store';
import { IHomeState } from './home.state';
import {
  getOrdersStatsSuccess,
  getTopSellsSuccess,
  resetHomeState,
} from './home.actions';

export const initialState: IHomeState = {
  stats: undefined,
  tops: [],
  errors: undefined,
};

export const homeReducer = createReducer(
  initialState,
  on(getTopSellsSuccess, (state, action) => ({
    ...state,
    tops: action.top,
  })),
  on(getOrdersStatsSuccess, (state, action) => ({
    ...state,
    stats: action.stats,
  })),
  on(resetHomeState, (state, action) => ({ ...state, ...initialState }))
);
