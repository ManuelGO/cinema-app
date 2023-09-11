import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { Booking } from 'src/app/core/models/booking';
import { BookingsService } from 'src/app/core/services/bookings/bookings.service';
import { DialogService } from 'src/app/core/services/dialog/dialog.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  displayedColumns = ['id', 'name'];
  dataSource = new MatTableDataSource<Booking>();
  totalElements!: number;
  pageSizes = [4];
  isLoading!: boolean;

  constructor(
    private bookingsService: BookingsService,
    private _formBuilder: FormBuilder,
    private dialogService: DialogService
  ) {}

  loadData(event: any) {
    return this.bookingsService
      .getPaginatedList(event.pageSize, event.pageIndex)
      .pipe(
        tap((response) => {
          this.totalElements = response.totalElements;
          this.dataSource = new MatTableDataSource(response.content);
        })
      )
      .subscribe();
  }
  addItem() {
    this.bookingsService
      .createBooking(416, 6)
      .subscribe((response) => console.log(response));
  }
}
