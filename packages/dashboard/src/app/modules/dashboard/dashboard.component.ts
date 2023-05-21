import { Component, HostBinding } from '@angular/core'

@Component({
  selector: 'goc-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  @HostBinding('class')
  get classes(): Record<string, boolean> {
    return {
      ...['d-flex', 'justify-content-center', 'flex-column', 'w-100', 'vh-100', 'overflow-hidden'].reduce(
        (a, c) => ({ ...a, [c]: true }),
        {}
      )
    }
  }
}
