import { NgModule } from '@angular/core';

import { TrackingRoutingModule } from './tracking-routing.module';
import { TrackingComponent } from './tracking.component';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ordersReducer } from '../orders/store/orders.reducer';
import { OrdersEffects } from '../orders/store/orders.effects';

@NgModule({
  declarations: [TrackingComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature('orders', ordersReducer),
    EffectsModule.forFeature([OrdersEffects]),
    TrackingRoutingModule,
  ],
})
export class TrackingModule {}
