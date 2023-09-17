import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper, StepperOrientation } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Cinema } from 'src/app/core/models/cinema';
import { Screening } from 'src/app/core/models/screening';
import { BookingsService } from 'src/app/core/services/bookings/bookings.service';
import { CinemasService } from 'src/app/core/services/cinemas/cinemas.service';

@Component({
  selector: 'app-add-booking-page',
  templateUrl: './add-booking-page.component.html',
  styleUrls: ['./add-booking-page.component.css'],
})
export class AddBookingPageComponent {
  formGroup = this.formBuilder.group({
    seats: ['', [Validators.required, Validators.min(1)]],
  });
  cinemasColumns = ['id', 'name', 'select'];
  screeningsColumns = ['id', 'cinemaName', 'movieName', 'startDate', 'select'];
  dataSource = new MatTableDataSource<Cinema>();
  screeningsDs = new MatTableDataSource<Screening>();
  screeningLength!: number;
  @ViewChild(MatStepper) stepper!: MatStepper;
  selectedScreening!: Screening;
  cinemaSelected!: Cinema;
  private breakpointObserver = inject(BreakpointObserver);
  stepperOrientation: Observable<StepperOrientation>;

  constructor(
    private formBuilder: FormBuilder,
    private cinemasService: CinemasService,
    private bookingsService: BookingsService
  ) {
    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

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
        this.selectedScreening.id,
        +this.formGroup.controls.seats.value!
      )
      .pipe(tap(() => this.stepper.reset()))
      .subscribe();
  }
}
