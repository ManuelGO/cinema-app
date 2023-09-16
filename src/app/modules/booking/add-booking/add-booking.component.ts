import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { Cinema } from 'src/app/core/models/cinema';
import { Screening } from 'src/app/core/models/screening';
import { BookingsService } from 'src/app/core/services/bookings/bookings.service';
import { CinemasService } from 'src/app/core/services/cinemas/cinemas.service';

@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.scss'],
})
export class AddBookingComponent {
  fromGroup = this.formBuilder.group({
    seats: ['', Validators.required],
  });
  isLinear = false;
  cinemasColumns = ['id', 'name', 'select'];
  screeningsColumns = ['id', 'cinemaName', 'movieName', 'select'];
  dataSource = new MatTableDataSource<Cinema>();
  screeningsDs = new MatTableDataSource<Screening>();
  screeningLength!: number;
  @ViewChild(MatStepper) stepper!: MatStepper;
  selectedScreening!: Screening;
  cinemaSelected!: Cinema;

  constructor(
    private formBuilder: FormBuilder,
    private cinemasService: CinemasService,
    private bookingsService: BookingsService
  ) {}

  setScreeningDs(cinema: Cinema) {
    this.cinemaSelected = cinema;
    this.cinemasService
      .listScreenings(cinema.id!)
      .pipe(
        tap((screenings) => {
          this.screeningsDs = new MatTableDataSource(screenings.content);
          this.screeningLength = screenings.numberOfElements;
          this.stepper.next();
        })
      )
      .subscribe();
  }
  screeningSelected(screening: Screening) {
    this.selectedScreening = screening;
    this.stepper.next();
  }

  addBooking() {
    this.bookingsService
      .createBooking(
        this.selectedScreening.id!,
        +this.fromGroup.controls.seats.value!
      )
      .subscribe();
  }
}
