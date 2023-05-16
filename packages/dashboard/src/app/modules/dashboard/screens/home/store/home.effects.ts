import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../shared/interfaces/app';
import { OrdersService } from '../../../services/orders.service';
import {
  getOrdersStats,
  getOrdersStatsError,
  getOrdersStatsSuccess,
  getTopSells,
  getTopSellsSuccess,
} from './home.actions';
import { ProductsService } from '../../../services/products.service';

@Injectable()
export class HomeEffects {
  constructor(
    private actions$: Actions,
    private ordersService: OrdersService,
    private productsService: ProductsService,
    private store: Store<IAppState>
  ) {}

  getOrdersStats$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getOrdersStats),
      withLatestFrom(this.store.select((state) => state.dashboard.currentPage)),
      switchMap(([action, page]) =>
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

  getTopSells$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTopSells),
      switchMap((action) =>
        this.productsService.getTopSells().pipe(
          map((response) => getTopSellsSuccess({ top: response })),
          catchError((error) => of(getOrdersStatsError(error)))
        )
      )
    )
  );
}
