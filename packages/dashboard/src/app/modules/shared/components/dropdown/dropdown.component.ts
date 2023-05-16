import {
  Component,
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'goc-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  isOpen = false;

  toggleMenu(e: any) {
    e.preventDefault();
    e.stopPropagation();
    this.isOpen = !this.isOpen;
    console.log(this.isOpen);
  }

  closeMenu() {
    this.isOpen = false;
  }
}

@Directive({
  selector: '[gocClickOutside]',
})
export class GocClickOutsideDirective {
  @Output() clickOutside = new EventEmitter();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    const isClickedInside = this.el.nativeElement.contains(target);
    if (!isClickedInside) {
      this.clickOutside.emit(null);
    }
  }
}
