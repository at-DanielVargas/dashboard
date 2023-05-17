import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPagination } from '../../interfaces/app';

@Component({
  selector: 'goc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() paginationData!: Partial<IPagination> | undefined;

  @Output() changePage: EventEmitter<number> = new EventEmitter();

  getPages(): number[] {
    const start = Math.max(1, (this.paginationData?.page || 0) - 2);
    const end = Math.min(
      this.paginationData?.totalPages || 0,
      (this.paginationData?.page || 0) + 3
    );
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
