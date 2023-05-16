import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [SalesComponent],
  imports: [SharedModule, SalesRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SalesModule {}
