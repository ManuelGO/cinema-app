import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper, MatStepperIntl } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { Cinema } from 'src/app/core/models/cinema';
import { Screen } from 'src/app/core/models/screen';
import { Screening } from 'src/app/core/models/screening';
import { BookingsService } from 'src/app/core/services/bookings/bookings.service';
import { CinemasService } from 'src/app/core/services/cinemas/cinemas.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss'],
})
export class AddBookingComponent {
  fromGroup = this._formBuilder.group({
    seats: ['', Validators.required],
  });
  isLinear = false;
  displayedColumns = ['id', 'name', 'select'];
  displayedColumns2 = ['id', 'cinemaName', 'movieName', 'select'];
  totalElements!: number;
  pageSizes = [4];
  dataSource = new MatTableDataSource<Cinema>();
  screeningsDs = new MatTableDataSource<Screening>();
  @ViewChild(MatStepper) stepper!: MatStepper;
  selectedScreen!: Screen;

  constructor(
    private _formBuilder: FormBuilder,
    private cinemasService: CinemasService,
    private bookingsService: BookingsService,
    private _matStepperIntl: MatStepperIntl
  ) {}
  loadData(event: any) {
    return this.cinemasService
      .getPaginatedList(event.pageSize, event.pageIndex, '', event.sort)
      .pipe(
        tap((response) => {
          this.totalElements = response.totalElements;
          this.dataSource = new MatTableDataSource(response.content);
        })
      )
      .subscribe();
  }
  setScreeningDs(cinema: Cinema) {
    this.cinemasService
      .listScreenings(cinema.id!)
      .pipe(
        tap((screenings) => {
          if (!screenings.empty) {
            this.screeningsDs = new MatTableDataSource(
              screenings.content as any[]
            );
            this.stepper.next();
          } else {
            // TODO, HANDLE NO SCREENING CASE
          }
        })
      )
      .subscribe();
  }
  screeningSelected(screen: Screen) {
    console.log(screen);
    this.selectedScreen = screen;
    this.stepper.next();
  }

  addBooking() {
    this.bookingsService
      .createBooking(
        this.selectedScreen.id!,
        +this.fromGroup.controls.seats.value!
      )
      .subscribe((r) => console.log(r));
  }
}
