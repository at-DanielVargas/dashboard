import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from '../../../shared/interfaces/app';
import { getOrdersStats, getTopSells } from './store/home.actions';
import { IStatus } from '../../../shared/components/status-group/status-group.component';
import { Observable, filter, map, take } from 'rxjs';
import { IProduct } from '../../../shared/interfaces/product';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@UntilDestroy()
@Component({
  selector: 'goc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  orderStats$: Observable<IStatus[]> = this.store.pipe(
    select((state) => state.home.stats),
    map((data = {}) =>
      Object.entries(data).map(([key, value]) => ({
        count: value,
        label: this.mapLabel(key),
      }))
    ),
    untilDestroyed(this)
  );

  topSellProducts$: Observable<IProduct[]> = this.store.pipe(
    select((state) => state.home.tops || []),
    untilDestroyed(this)
  );

  constructor(private store: Store<IAppState>) {}

  mapLabel(key: string): string {
    const labels: Record<string, string> = {
      cancellation: 'Cancelación',
      refund: 'Devolución',
      promo: 'Promoción',
      warranty: 'Garantias',
      sale: 'Ventas',
      addition: 'Adición',
    };
    return labels[key];
  }

  ngOnInit(): void {
    this.store.dispatch(getOrdersStats());
    this.store.dispatch(getTopSells());

    this.orderStats$
      .pipe(
        filter((data) => !!data),
        take(1)
      )
      .subscribe((data) => {
        
      });
      new Chart('cancelations', {
        type: 'line',
        data: {
          labels: [...data.map((data) => data.label)],
          datasets: [
            {
              label: 'Cancelaciones',
              data: data.map((d) => d.count),
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
  }
}
