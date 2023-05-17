import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../../shared/interfaces/app';
import { OrdersService } from '../../../services/orders.service';
import {
  getSellsProfitError,
  getSellsProfitSuccess,
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

  getTopSells$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTopSells),
      switchMap((action) =>
        this.productsService.getTopSells().pipe(
          map((response) => getTopSellsSuccess({ top: response })),
          catchError((error) => of(getSellsProfitError(error)))
        )
      )
    )
  );

  getSellsProfit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTopSells),
      switchMap((action) =>
        this.productsService.getSellsProfit().pipe(
          map((response) =>
            getSellsProfitSuccess({
              profit: response.totalProfit,
              sells: response.totalSells,
              products: response.total,
            })
          ),
          catchError((error) => of(getSellsProfitError(error)))
        )
      )
    )
  );
}
