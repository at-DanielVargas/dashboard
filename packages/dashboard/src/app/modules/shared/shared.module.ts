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
import {
  DropdownComponent,
  GocClickOutsideDirective,
} from './components/dropdown/dropdown.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ContainerComponent } from './components/container/container.component';
import { ContentComponent } from './components/content/content.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CardContainerComponent,
    SearchBarComponent,
    StatusGroupComponent,
    ButtonComponent,
    SidebarComponent,
    TimelineComponent,
    DropdownComponent,
    GocClickOutsideDirective,
    PaginationComponent,
    ContainerComponent,
    ContentComponent,
    BreadcrumbComponent,
  ],
  imports: [CommonModule, HttpClientModule, RouterModule],
  exports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    CardContainerComponent,
    SearchBarComponent,
    StatusGroupComponent,
    ButtonComponent,
    SidebarComponent,
    TimelineComponent,
    DropdownComponent,
    GocClickOutsideDirective,
    PaginationComponent,
    ContainerComponent,
    ContentComponent,
    BreadcrumbComponent,
  ],
})
export class SharedModule {}
