import { Component, OnInit } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../shared/interfaces/app';
import { getOrders } from '../../store/dashboard.actions';

@UntilDestroy()
@Component({
  selector: 'goc-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  constructor(private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getOrders());
  }
}
