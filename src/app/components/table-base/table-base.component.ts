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
import { DEFAULT_PAGES_SIZE } from 'src/app/core/constants/global.constans';
import { TableLoadEvent } from 'src/app/core/models/table-load-event';

@Component({
  selector: 'app-table-base',
  templateUrl: './table-base.component.html',
  styleUrls: ['./table-base.component.scss'],
})
/**
 * TableBaseComponent is a generic component designed to provide common functionality for handling data tables.
 * It can be extended by specific components to create custom data tables with various features.
 *
 * @template T - The type of data elements to be displayed in the table.
 */
export class TableBaseComponent<T> implements AfterViewInit {
  /**
   * Input property to specify the list of column names to be displayed in the table.
   */
  @Input() displayedColumns!: string[];
  /**
   * Input property to provide the data source for the table.
   */
  @Input() dataSource = new MatTableDataSource<T>();
  /**
   * Input property representing the total number of elements in the dataset.
   */
  @Input() totalElements!: number;
  /**
   * Input property to enable or disable navigation actions (e.g., on row click).
   */
  @Input() allowNavigation: boolean = false;
  /**
   * Input property to specify the available page sizes for pagination.
   */
  @Input() pageSizes = DEFAULT_PAGES_SIZE;
  /**
   * Input property to set a caption or title for the table.
   */
  @Input() tableCaption!: string;
  /**
   * Input property to enable or disable column sorting in the table.
   */
  @Input() allowSorting: boolean = false;
  /**
   * Output event emitted when data needs to be loaded or reloaded in the table.
   * This event includes pagination and sorting information.
   */
  @Output() loadData = new EventEmitter<TableLoadEvent>();
  /**
   * Output event emitted to create a new entity.
   */
  @Output() addNewItem = new EventEmitter<T>();
  /**
   * Output event emitted when a row is selected.
   */
  @Output() rowSelected = new EventEmitter<T>();
  /**
   * Output event emitted when a navigation action is triggered, we pass the row information lo be used in the route.
   */
  @Output() navigate = new EventEmitter<T>();
  /**
   * ViewChild decorator used to access the Angular Material Paginator component.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  /**
   * ViewChild decorator used to access the Angular Material Sort component.
   */
  @ViewChild(MatSort) sort!: MatSort;

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
  onSelect(ev: any, r: T) {
    this.rowSelected.emit(r);
  }
  onNavigation(entity: T) {
    this.navigate.emit(entity);
  }
}
