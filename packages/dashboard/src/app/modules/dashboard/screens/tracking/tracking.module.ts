import { NgModule } from '@angular/core';

import { TrackingRoutingModule } from './tracking-routing.module';
import { TrackingComponent } from './tracking.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [TrackingComponent],
  imports: [SharedModule, TrackingRoutingModule],
})
export class TrackingModule {}
