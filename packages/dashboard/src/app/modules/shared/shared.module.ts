import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CardContainerComponent } from './components/card-container/card-container.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { StatusGroupComponent } from './components/status-group/status-group.component';
import { ButtonComponent } from './components/button/button.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TimelineComponent } from './components/timeline/timeline.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HeaderComponent,
    CardContainerComponent,
    SearchBarComponent,
    StatusGroupComponent,
    ButtonComponent,
    SidebarComponent,
    TimelineComponent,
  ],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    CardContainerComponent,
    SearchBarComponent,
    SidebarComponent,
    TimelineComponent,
  ],
})
export class SharedModule {}
