import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '../../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { homeReducer } from './store/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './store/home.effects';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([HomeEffects]),
    HomeRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
