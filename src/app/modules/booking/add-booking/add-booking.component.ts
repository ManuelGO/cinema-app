import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
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
  selectedScreen!: Screen;

  constructor(
    private formBuilder: FormBuilder,
    private cinemasService: CinemasService,
    private bookingsService: BookingsService
  ) {}

  setScreeningDs(cinema: Cinema) {
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
  screeningSelected(screen: Screen) {
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
