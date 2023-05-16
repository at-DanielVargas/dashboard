import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../shared/interfaces/app';
import { getOrders, resetOrders } from './store/orders.actions';
import { Observable } from 'rxjs';
import { IOrder } from '../../../shared/interfaces/order';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'goc-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders$: Observable<Partial<IOrder>[]> = this.store.pipe(
    select((state) => state.orders.orders),
    untilDestroyed(this)
  );

  constructor(private store: Store<IAppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(resetOrders());
  }

  ngOnInit() {
    this.store.dispatch(getOrders());
  }
}
