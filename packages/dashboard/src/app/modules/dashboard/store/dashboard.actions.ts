import { createAction, props } from '@ngrx/store'
import { IOrder } from '../../shared/interfaces/order'

export enum actionTypes {
  getOrders = '@dashboard/getOrders',
  getOrdersSuccess = '@dashboard/getOrdersSuccess',
  getOrdersError = '@dashboard/getOrdersError',

  getOrderDetails = '@dashboard/getOrderDetails',
  getOrderDetailsSuccess = '@dashboard/getOrderDetailsSuccess',
  getOrderDetailsError = '@dashboard/getOrderDetailsError',

  setOrder = '@dashboard/setOrder',
  setOrderSuccess = '@dashboard/setOrderSuccess',
  setOrderError = '@dashboard/setOrderError',

  resetOrders = '@dashboard/resetOrders'
}

export const resetOrders = createAction(actionTypes.resetOrders)
export const getOrders = createAction(actionTypes.getOrders)

export const getOrdersSuccess = createAction(
  actionTypes.getOrdersSuccess,
  props<{
    orders: Partial<IOrder>[]
    totalOrders: number
    totalPages: number
    currentPage: number
  }>()
)

export const getOrdersError = createAction(actionTypes.getOrdersError, props<{ error: string }>())

export const setCurrentOrder = createAction(actionTypes.setOrder)

export const setCurrentOrderSuccess = createAction(actionTypes.setOrderSuccess, props<{ order: Partial<IOrder> }>())

export const getOrderDetails = createAction(actionTypes.getOrderDetails, props<{ id: string | undefined }>())

export const getOrderDetailsSuccess = createAction(actionTypes.getOrderDetailsSuccess, props<{ order: IOrder }>())

export const getOrderDetailsError = createAction(actionTypes.getOrderDetailsError, props<{ error: string }>())
