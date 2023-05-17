import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getOrderDetails,
  getOrderDetailsError,
  getOrderDetailsSuccess,
  getOrders,
  getOrdersError,
  getOrdersStats,
  getOrdersStatsError,
  getOrdersStatsSuccess,
  getOrdersSuccess,
  setKindFilter,
} from './orders.actions';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../shared/interfaces/app';
import { OrdersService } from '../../../services/orders.service';

@Injectable()
export class OrdersEffects {
  constructor(
    private actions$: Actions,
    private ordersService: OrdersService,
    private store: Store<IAppState>
  ) {}

  getOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrders, setKindFilter),
      withLatestFrom(this.store.select((state) => state.orders.kindFilter)),
      switchMap(([, kind]) =>
        this.ordersService.getOrders({ kind }).pipe(
          map((response) =>
            getOrdersSuccess({
              orders: response.items,
              totalOrders: response.total,
              totalPages: response.totalPages,
              currentPage: response.page,
            })
          ),
          catchError((error) => of(getOrdersError({ error })))
        )
      )
    )
  );

  getOrdersStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrdersStats),
      switchMap(() =>
        this.ordersService.getOrdersStats().pipe(
          map((response) =>
            getOrdersStatsSuccess({
              stats: response,
            })
          ),
          catchError((error) => of(getOrdersStatsError({ error })))
        )
      )
    )
  );

  getOrderDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrderDetails),
      switchMap((action) =>
        this.ordersService.getOrderDetails(action.id).pipe(
          map((response) => getOrderDetailsSuccess({ order: response.order })),
          catchError((error) => of(getOrderDetailsError({ error })))
        )
      )
    )
  );
}
