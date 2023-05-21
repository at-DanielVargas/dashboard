import { createReducer, on } from '@ngrx/store'
import { IOrdersState } from './orders.state'
import {
  getOrderDetailsSuccess,
  getOrderTrackingSuccess,
  getOrdersPage,
  getOrdersStatsSuccess,
  getOrdersSuccess,
  resetOrders,
  setKindFilter
} from './orders.actions'
import { OrderLabel } from '../../../../shared/constants'

export const initialState: IOrdersState = {
  kindFilter: 'refund',
  stats: undefined,
  items: [],
  currentOrder: undefined,
  errors: undefined,
  total: 0,
  limit: 0,
  totalPages: 0,
  page: 1,
  pagingCounter: 0,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: 0,
  nextPage: 0
}

export const ordersReducer = createReducer(
  initialState,
  on(getOrdersSuccess, (state, action) => ({
    ...state,
    ...action.items
  })),
  on(getOrderDetailsSuccess, (state, action) => ({
    ...state,
    currentOrder: action.order
  })),

  on(getOrderTrackingSuccess, (state, action) => {
    return {
      ...state,
      currentOrder: action.order
    }
  }),

  on(getOrdersPage, (state, action) => ({ ...state, page: action.page })),

  on(setKindFilter, (state, action) => ({
    ...state,
    kindFilter: action.kind,
    page: 1
  })),

  on(getOrdersStatsSuccess, (state, action) => {
    const stats = Object.entries(action.stats).map(([key, value]) => ({
      count: String(value),
      label: OrderLabel[key],
      key
    }))

    return {
      ...state,
      stats
    }
  }),

  on(resetOrders, (state, action) => ({ ...state, ...initialState }))
)
