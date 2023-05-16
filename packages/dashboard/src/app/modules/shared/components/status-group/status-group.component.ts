import { Component, Input } from '@angular/core';

export interface IStatus {
  count: number;
  label: string;
  color?: string;
}

@Component({
  selector: 'goc-status-group',
  templateUrl: './status-group.component.html',
  styleUrls: ['./status-group.component.scss'],
})
export class StatusGroupComponent {
  @Input() data: IStatus[] = [];
}
