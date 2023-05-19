import { Component, HostBinding, Input } from '@angular/core';
import { arrayCssToRecordBoolean } from 'packages/dashboard/src/app/utils/arrayCssToRecordBoolen';

export interface ISidebarLink {
  icon: string;
  target: string;
}

@Component({
  selector: 'goc-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() links: ISidebarLink[] = [];

  @HostBinding('class')
  get classes(): Record<string, boolean> {
    return arrayCssToRecordBoolean(['vstack', 'd-none', 'd-lg-flex']);
  }
}
