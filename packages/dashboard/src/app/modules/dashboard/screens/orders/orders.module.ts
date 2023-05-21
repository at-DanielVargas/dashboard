import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'

import { OrdersRoutingModule } from './orders-routing.module'
import { OrdersComponent } from './orders.component'
import { SharedModule } from '../../../shared/shared.module'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { ordersReducer } from './store/orders.reducer'
import { OrdersEffects } from './store/orders.effects'

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature('orders', ordersReducer),
    EffectsModule.forFeature([OrdersEffects]),
    OrdersRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrdersModule {}
