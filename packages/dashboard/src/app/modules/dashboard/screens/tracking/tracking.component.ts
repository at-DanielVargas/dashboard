import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../shared/interfaces/app';
import { getOrderTracking } from '../orders/store/orders.actions';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, tap } from 'rxjs';
import { IOrder } from '../../../shared/interfaces/order';
import { ITracking } from '../../../shared/interfaces/tracking';

@UntilDestroy()
@Component({
  selector: 'goc-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss'],
})
export class TrackingComponent implements OnInit {
  order$: Observable<IOrder | undefined> = this.store.pipe(
    select((state) => state.orders.currentOrder),
    untilDestroyed(this)
  );

  collectTracking$: Observable<ITracking | undefined> = this.store.pipe(
    select((state) => state.orders.currentOrder?.collectTracking),
    tap(console.log),
    untilDestroyed(this)
  );

  sendTracking$: Observable<ITracking | undefined> = this.store.pipe(
    select((state) => state.orders.currentOrder?.sendTracking),
    tap(console.log),
    untilDestroyed(this)
  );

  constructor(
    private store: Store<IAppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(untilDestroyed(this))
      .subscribe((params) => {
        if (params['order']) {
          this.store.dispatch(getOrderTracking({ id: params['order'] }));
        }
      });
  }
}
