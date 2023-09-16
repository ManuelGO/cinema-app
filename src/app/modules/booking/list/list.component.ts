import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { DEFAULT_PAGES_SIZE } from 'src/app/core/constants/global.constans';
import { Booking } from 'src/app/core/models/booking';
import { TableLoadEvent } from 'src/app/core/models/table-load-event';
import { BookingsService } from 'src/app/core/services/bookings/bookings.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  displayedColumns = ['id'];
  dataSource = new MatTableDataSource<Booking>();
  totalElements!: number;
  pageSizes = DEFAULT_PAGES_SIZE;
  isLoading!: boolean;

  constructor(private bookingsService: BookingsService) {}

  loadData(event: TableLoadEvent) {
    return this.bookingsService
      .getPaginatedList(event.pageSize, event.pageIndex, '', event.sort)
      .pipe(
        tap((response) => {
          this.totalElements = response.totalElements;
          this.dataSource = new MatTableDataSource(response.content);
        })
      )
      .subscribe();
  }
}
