import { Component, HostBinding } from '@angular/core'

@Component({
  selector: 'goc-container',
  template: '<ng-content></ng-content>'
})
export class ContainerComponent {
  @HostBinding('class')
  get classes(): Record<string, boolean> {
    return {
      ...['d-flex', 'justify-content-center', 'w-100', 'vh-100', 'overflow-hidden'].reduce((a, c) => ({ ...a, [c]: true }), {})
    }
  }
}
