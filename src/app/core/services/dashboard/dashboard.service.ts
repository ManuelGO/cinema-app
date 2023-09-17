import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, forkJoin, map, tap } from 'rxjs';
import { CinemasService } from 'src/app/core/services/cinemas/cinemas.service';
import {
  DEFAULT_PAGE_INDEX,
  DEFAULT_PAGE_SIZE,
} from '../../constants/global.constans';
import { DashBoardData } from '../../models/dashboard-data';
import { Movie } from '../../models/movie';
import { BookingsService } from '../bookings/bookings.service';
import { MoviesService } from '../movies/movies.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  moviesDs = new MatTableDataSource<Movie>();

  constructor(
    private cinemasService: CinemasService,
    private moviesService: MoviesService,
    private bookingsService: BookingsService
  ) {}

  getDasboardData(): Observable<DashBoardData> {
    const movies = this.moviesService
      .getPaginatedList(DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX, '')
      .pipe(
        tap((response) => {
          this.moviesDs = new MatTableDataSource(response.content);
        }),
        map((response) => response.totalElements)
      );
    const cinemas = this.cinemasService
      .getPaginatedList(DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX, '')
      .pipe(map((response) => response.totalElements));
    const bookings = this.bookingsService
      .getPaginatedList(DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX, '')
      .pipe(map((response) => response.totalElements));
    const screens = this.cinemasService
      .getAllPages()
      .pipe(
        map(
          (response) => response.map((cinema) => cinema.screens).flat().length
        )
      );

    return forkJoin({
      movies,
      cinemas,
      bookings,
      screens,
    });
  }

  getDashBoard() {
    return this.moviesDs;
  }
}
