import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { getOrderDetails, getOrderDetailsError, getOrderDetailsSuccess } from './dashboard.actions'
import { catchError, map, of, switchMap, withLatestFrom } from 'rxjs'
import { OrdersService } from '../services/orders.service'
import { Store, select } from '@ngrx/store'
import { IAppState } from '../../shared/interfaces/app'

@Injectable()
export class DashboardEffects {
  constructor(private actions$: Actions, private ordersService: OrdersService, private store: Store<IAppState>) {}

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
  )
}
