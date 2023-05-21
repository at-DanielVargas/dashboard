import { Component, Input } from '@angular/core'

export interface IStatus {
  count: string | null
  label: string | null
  color?: string | null
  key?: string | null
}

@Component({
  selector: 'goc-status-group',
  templateUrl: './status-group.component.html',
  styleUrls: ['./status-group.component.scss']
})
export class StatusGroupComponent {
  @Input() data: IStatus[] = []
}
