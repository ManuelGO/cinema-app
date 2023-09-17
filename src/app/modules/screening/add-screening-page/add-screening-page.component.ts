import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { DEFAULT_PAGES_SIZE } from 'src/app/core/constants/global.constans';
import { Cinema } from 'src/app/core/models/cinema';
import { Movie } from 'src/app/core/models/movie';
import { Screen } from 'src/app/core/models/screen';
import { ScreeningRequest } from 'src/app/core/models/screening';
import { CinemasService } from 'src/app/core/services/cinemas/cinemas.service';
@Component({
  selector: 'app-add-screening-page',
  templateUrl: './add-screening-page.component.html',
  styleUrls: ['./add-screening-page.component.css'],
})
export class AddScreeningPageComponent {
  moviesColumns = ['select', 'id', 'name', 'runtime'];
  cinemasColumns = ['select', 'id', 'name', 'screens'];
  screensColumns = ['select', 'id', 'name'];

  moviesDs = new MatTableDataSource<Movie>();
  totalElements!: number;
  pageSizes = DEFAULT_PAGES_SIZE;

  @ViewChild(MatStepper) stepper!: MatStepper;

  screensDs = new MatTableDataSource<Screen>();
  screensLength!: number;

  formGroup = this.formBuilder.group({
    startTime: ['', Validators.required],
  });
  screen!: Screen;
  movie!: Movie;
  cinema!: Cinema;

  constructor(
    private formBuilder: FormBuilder,
    private cinemasService: CinemasService
  ) {}

  createScreening() {
    const screening: ScreeningRequest = {
      movieId: this.movie.id!,
      startTime: this.startTime.value!,
    };
    this.cinemasService
      .screateScreening(screening, this.cinema.id!, this.screen.id!)
      .pipe(tap(() => this.stepper.reset()))
      .subscribe();
  }

  movieSelected(movie: Movie): void {
    this.movie = movie;
    this.stepper.next();
  }
  cinemaSelected(cinema: Cinema): void {
    this.cinema = cinema;
    this.screensDs = new MatTableDataSource(cinema.screens);
    this.screensLength = cinema.screens.length;
    this.stepper.next();
  }
  screenSelected(screen: Screen): void {
    this.screen = screen;
    this.stepper.next();
  }
  get startTime() {
    return this.formGroup.controls.startTime;
  }
}
