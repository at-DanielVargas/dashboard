import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from './store/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './store/home.effects';
import { OrdersEffects } from '../orders/store/orders.effects';
import { ordersReducer } from '../orders/store/orders.reducer';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    NgChartsModule,
    StoreModule.forFeature('home', homeReducer),
    StoreModule.forFeature('orders', ordersReducer),
    EffectsModule.forFeature([HomeEffects, OrdersEffects]),
    HomeRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
