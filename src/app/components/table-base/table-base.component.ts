import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, startWith, tap } from 'rxjs';

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
  @ViewChild(MatSort) sort!: MatSort;
  @Input() allowNavigation: boolean = false;
  pageSizes = [10, 15, 20];

  ngAfterViewInit(): void {
    this.setupDataTable();
  }
  setupDataTable() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      merge(this.paginator.page, this.sort.sortChange)
        .pipe(
          startWith({}),
          tap(() => {
            const { active, direction } = this.sort;
            const { pageIndex, pageSize } = this.paginator;
            this.loadData.emit({
              pageIndex,
              pageSize,
              sort: `${active},${direction}`,
            });
          })
        )
        .subscribe();
    }
  }

  addItem(entity: T) {
    this.addNewItem.emit(entity);
  }
}
