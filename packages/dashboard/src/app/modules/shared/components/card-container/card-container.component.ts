import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'goc-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss'],
})
export class CardContainerComponent {
  @ContentChild('title') title?: TemplateRef<unknown>;
  @ContentChild('icon') icon?: TemplateRef<unknown>;
  @ContentChild('content') content?: TemplateRef<unknown>;

  alert() {
    console.log('alert');
  }
}
