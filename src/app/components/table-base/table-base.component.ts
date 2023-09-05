import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { startWith, tap } from 'rxjs';

@Component({
  selector: 'app-table-base',
  templateUrl: './table-base.component.html',
  styleUrls: ['./table-base.component.scss'],
})
export class TableBaseComponent<T> implements AfterViewInit {
  @Input() displayedColumns!: string[];
  @Input() dataSource = new MatTableDataSource<T>();
  @Input() totalElements!: number;
  @Output() loadData = new EventEmitter<any>();
  @Output() addNewItem = new EventEmitter<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizes = [10, 15, 20];

  ngAfterViewInit(): void {
    this.setUpPaginator();
  }
  setUpPaginator() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.paginator.page
        .pipe(
          startWith({}),
          tap(() => {
            const { pageIndex, pageSize } = this.paginator;
            this.loadData.emit({ pageIndex, pageSize });
          })
        )
        .subscribe();
    }
  }

  addItem(entity: T) {
    this.addNewItem.emit(entity);
  }
}
