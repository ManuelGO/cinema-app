import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { Cinema } from 'src/app/core/models/cinema';
import { Movie } from 'src/app/core/models/movie';
import { Screen } from 'src/app/core/models/screen';
import { CinemasService } from 'src/app/core/services/cinemas/cinemas.service';
import { MoviesService } from 'src/app/core/services/movies/movies.service';

@Component({
  selector: 'app-add-screening',
  templateUrl: './add-screening.component.html',
  styleUrls: ['./add-screening.component.scss'],
})
export class AddScreeningComponent {
  moviesColumns = ['select', 'id', 'name', 'runtime'];
  moviesDs = new MatTableDataSource<Movie>();
  totalElements!: number;
  pageSizes = [10, 15, 20];

  cinemaColumn = ['select', 'id', 'name'];
  cinemasDs = new MatTableDataSource<Cinema>();
  cinemasLengh!: number;
  @ViewChild(MatStepper) stepper!: MatStepper;

  screensColumns = ['select', 'id', 'name'];
  screensDs = new MatTableDataSource<Screen>();
  screensLengh!: number;

  fromGroup = this.formBuilder.group({
    start: ['', Validators.required],
  });

  constructor(
    private moviesService: MoviesService,
    private cinemasService: CinemasService,
    private formBuilder: FormBuilder
  ) {}

  loadMovies(event: any) {
    return this.moviesService
      .getPaginatedList(event.pageSize, event.pageIndex)
      .pipe(
        tap((response) => {
          this.totalElements = response.totalElements;
          this.moviesDs = new MatTableDataSource(response.content);
        })
      )
      .subscribe();
  }
  loadCinemas(event: any) {
    return this.cinemasService
      .getPaginatedList(event.pageSize, event.pageIndex, '', event.sort)
      .pipe(
        tap((response) => {
          this.cinemasLengh = response.totalElements;
          this.cinemasDs = new MatTableDataSource(response.content);
        })
      )
      .subscribe();
  }
  movieSelected(event: any) {
    this.stepper.next();
  }
  cinemaSelected(cinema: Cinema) {
    this.screensDs = new MatTableDataSource(cinema.screens);
    this.stepper.next();
  }
}
