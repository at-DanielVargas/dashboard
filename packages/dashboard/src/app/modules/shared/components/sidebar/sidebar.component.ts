import { Component, HostBinding, Input } from '@angular/core';

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
    return {
      ...['px-4', 'py-lg-3', 'gap-4', 'vstack', 'd-none', 'd-lg-flex'].reduce(
        (a, c) => ({ ...a, [c]: true }),
        {}
      ),
    };
  }
}
