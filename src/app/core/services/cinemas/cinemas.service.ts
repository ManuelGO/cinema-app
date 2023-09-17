import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { BaseEntity } from '../../models/base-entity';
import { Cinema } from '../../models/cinema';
import { CinemaParams } from '../../models/cinema-params';
import { EntityType } from '../../models/entity-type.enum';
import { PageableResponse } from '../../models/pageable-response';
import { Screen } from '../../models/screen';
import {
  Screening,
  ScreeningRaw,
  ScreeningRequest,
} from '../../models/screening';
import { BaseService } from '../base-service';

@Injectable({
  providedIn: 'root',
})
export class CinemasService extends BaseService<Cinema> {
  override endpoint = 'cinemas';
  cinemaParams$: BehaviorSubject<CinemaParams | null> =
    new BehaviorSubject<CinemaParams | null>(null);

  saveItem(
    newItem: Cinema,
    type?: string,
    entityId?: number
  ): Observable<null> {
    if (type === EntityType.SCREEN) {
      return this.saveScreen(entityId!, newItem);
    }
    return this.http.put<null>(this.endpoint, newItem);
  }

  saveScreen(cinemaId: number, screen: BaseEntity): Observable<null> {
    return this.http.put<null>(`${this.endpoint}/${cinemaId}/screens`, screen);
  }

  listScreenings(cinemaId: number): Observable<PageableResponse<Screening>> {
    return this.http
      .get<PageableResponse<ScreeningRaw>>(
        `${this.endpoint}/${cinemaId}/screenings`
      )
      .pipe(
        map((response) => ({
          ...response,
          content: response.content.map((item) => ({
            cinemaName: item.cinemaName,
            id: item.id,
            screenName: item.screenName,
            movieName: item.movie.name,
            startDate: item.start,
          })),
        }))
      );
  }

  setCinemaParams(cinemaParams: CinemaParams): void {
    this.cinemaParams$.next(cinemaParams);
  }
  getCurrentParams(): Observable<CinemaParams | null> {
    return this.cinemaParams$.asObservable();
  }

  getCurrentCinema() {
    const { cinema, params } = this.cinemaParams$.value!;
    this.getPaginatedList(params.pageSize, params.pageIndex, '', params.sort)
      .pipe(
        tap((response) => {
          const currentCinema = response.content.find(
            (item) => item.id === cinema.id
          );
          this.cinemaParams$.next({ cinema: currentCinema!, params });
        })
      )
      .subscribe();
  }

  getAllScrens(): Observable<Screen[]> {
    return this.getAllPages().pipe(
      map((response) => response.map((cinema) => cinema.screens).flat())
    );
  }

  screateScreening(
    screening: ScreeningRequest,
    cinemaId: number,
    screenId: number
  ): Observable<null> {
    return this.http.put<null>(
      `${this.endpoint}/${cinemaId}/screens/${screenId}/screenings`,
      screening
    );
  }
}
