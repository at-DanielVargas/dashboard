import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () =>
          import('./screens/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./screens/orders/orders.module').then((m) => m.OrdersModule),
      },
      {
        path: 'tracking',
        loadChildren: () =>
          import('./screens/tracking/tracking.module').then(
            (m) => m.TrackingModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./screens/categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'shop',
        loadChildren: () =>
          import('./screens/store/store.module').then((m) => m.StoreModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./screens/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('./screens/sales/sales.module').then((m) => m.SalesModule),
      },
    ],
  },
];
