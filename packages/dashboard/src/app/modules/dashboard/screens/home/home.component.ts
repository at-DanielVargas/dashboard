import { Component, OnInit, ViewChild } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { IAppState } from '../../../shared/interfaces/app'
import { getSellsProfit, getTopSells } from './store/home.actions'
import { IStatus } from '../../../shared/components/status-group/status-group.component'
import { Observable, filter, map } from 'rxjs'
import { IProduct } from '../../../shared/interfaces/product'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'

import { ChartConfiguration, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts'
import { CurrencyPipe } from '@angular/common'
import { getOrdersStats } from '../orders/store/orders.actions'

@UntilDestroy()
@Component({
  selector: 'goc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CurrencyPipe]
})
export class HomeComponent implements OnInit {
  orderStats$: Observable<IStatus[] | undefined> = this.store.pipe(
    select((state) => state.orders.stats),
    untilDestroyed(this)
  )

  topSellProducts$: Observable<IProduct[]> = this.store.pipe(
    select((state) => state.home.tops || []),
    untilDestroyed(this)
  )

  totalSells$: Observable<IStatus[]> = this.store.pipe(
    select((state) => ({
      profit: state.home.profit,
      sells: state.home.sells,
      products: state.home.products
    })),
    map(({ profit, sells, products }) => [
      {
        label: 'Total en ventas',
        count: this.currency.transform(sells),
        color: 'blue'
      },
      {
        label: 'Productos vendidos',
        count: String(products),
        color: '#4bc99a'
      },
      {
        label: 'Ganancias Totales',
        count: this.currency.transform(profit),
        color: 'green'
      }
    ]),
    untilDestroyed(this)
  )

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [2],
        label: 'Ventas de la plataforma',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin'
      }
    ]
  }

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    elements: {
      line: {
        tension: 0.5
      }
    }
  }

  public lineChartType: ChartType = 'bar'

  constructor(private store: Store<IAppState>, private currency: CurrencyPipe) {}

  ngOnInit(): void {
    this.store.dispatch(getOrdersStats())
    this.store.dispatch(getTopSells())
    this.store.dispatch(getSellsProfit())

    this.orderStats$.pipe(filter((data) => !!data)).subscribe((data) => {
      if (data) {
        this.lineChartData.datasets[0].data = data.map((d) => Number(d.count))
        this.lineChartData.labels = data.map((d) => d.label)
      }
      this.chart?.update()
    })
  }
}
