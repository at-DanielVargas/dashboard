import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'goc-content',
  template: '<ng-content></ng-content>',
})
export class ContentComponent {
  @HostBinding('class')
  get classes(): Record<string, boolean> {
    return {
      ...['p-3', 'w-100', 'bg-light'].reduce((a, c) => ({ ...a, [c]: true }), {}),
    };
  }
}
