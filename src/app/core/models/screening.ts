import { Movie } from './movie';

export interface Screening {
  cinemaName: string;
  id: number;
  screenName: string;
  movieName: string;
  startDate: string;
}

export interface ScreeningRaw {
  cinemaName: string;
  id: number;
  screenName: string;
  start: string;
  movie: Movie;
}
