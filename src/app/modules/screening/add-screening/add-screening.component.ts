import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs';
import { Cinema } from 'src/app/core/models/cinema';
import { Movie } from 'src/app/core/models/movie';
import { Screen } from 'src/app/core/models/screen';
import { MoviesService } from 'src/app/core/services/movies/movies.service';

@Component({
  selector: 'app-add-screening',
  templateUrl: './add-screening.component.html',
  styleUrls: ['./add-screening.component.scss'],
})
export class AddScreeningComponent {
  moviesColumns = ['select', 'id', 'name', 'runtime'];
  cinemasColumns = ['select', 'id', 'name', 'screens'];
  screensColunms = ['select', 'id', 'name'];

  moviesDs = new MatTableDataSource<Movie>();
  totalElements!: number;
  pageSizes = [10, 15, 20];

  @ViewChild(MatStepper) stepper!: MatStepper;

  screensColumns = ['select', 'id', 'name'];
  screensDs = new MatTableDataSource<Screen>();
  screensLength!: number;

  fromGroup = this.formBuilder.group({
    start: ['', Validators.required],
  });
  screen!: Screen;

  constructor(
    private moviesService: MoviesService,
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

  movieSelected(event: any): void {
    this.stepper.next();
  }
  cinemaSelected(cinema: Cinema): void {
    this.screensDs = new MatTableDataSource(cinema.screens);
    this.screensLength = cinema.screens.length;
    this.stepper.next();
  }
  screenSelected(screen: Screen): void {
    this.screen = screen;
    this.stepper.next();
  }
}
