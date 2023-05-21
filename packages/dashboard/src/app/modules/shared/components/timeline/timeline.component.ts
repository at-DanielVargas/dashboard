import { Component, Input } from '@angular/core'
import { ITracking } from '../../interfaces/tracking'
import { OnInit } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'goc-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  timelineData$: BehaviorSubject<ITracking['History'] | undefined> = new BehaviorSubject<ITracking['History'] | undefined>(
    undefined
  )

  @Input() set timelineData(data: ITracking['History'] | undefined) {
    this.timelineData$.next(data)
  }

  ngOnInit(): void {}
}
