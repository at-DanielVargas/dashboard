import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../shared/interfaces/app';
import {
  getOrders,
  getOrdersStats,
  resetOrders,
  setKindFilter,
} from './store/orders.actions';
import { Observable } from 'rxjs';
import { IOrder } from '../../../shared/interfaces/order';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { IStatus } from '../../../shared/components/status-group/status-group.component';

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

  orderKinds$: Observable<IStatus[] | undefined> = this.store.pipe(
    select((state) => state.orders.stats),
    untilDestroyed(this)
  );

  currentOrderKind$: Observable<string> = this.store.pipe(
    select((state) => state.orders.kindFilter),
    untilDestroyed(this)
  );

  constructor(private store: Store<IAppState>) {}

  ngOnDestroy(): void {
    this.store.dispatch(resetOrders());
  }

  ngOnInit() {
    this.store.dispatch(getOrdersStats());
    this.store.dispatch(getOrders());
  }

  mapColorToKind(kind: string) {
    const classes = {};
  }

  getTotal(order: Partial<IOrder>) {
    if (order?.items === undefined) return;
    return order.items.reduce(
      (acc, current) => acc + current.item.price * current.quantity,
      0
    );
  }

  getProfit(order: Partial<IOrder>) {
    if (order?.items === undefined) return;
    return order.items.reduce(
      (acc, current) =>
        acc +
        (current.item.price - current.item.supplierPrice) * current.quantity,
      0
    );
  }

  setKindFilter(kind: string | null | undefined) {
    if (!kind) return;
    this.store.dispatch(setKindFilter({ kind }));
  }
}
