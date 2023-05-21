import { Component, HostBinding } from '@angular/core'
import { arrayCssToRecordBoolean } from 'packages/dashboard/src/app/utils/arrayCssToRecordBoolen'

@Component({
  selector: 'goc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @HostBinding('class')
  get classes(): Record<string, boolean> {
    return arrayCssToRecordBoolean(['text-bg-dark'])
  }
}
