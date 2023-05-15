import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { OrdersComponent } from './screens/orders/orders.component';
import { SalesComponent } from './screens/sales/sales.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: "full" },
      {
        path: 'home',
        component: OrdersComponent,
      },
      {
        path: 'sales',
        component: SalesComponent,
      },
    ],
  },
];
