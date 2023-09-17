import { Injectable, OnDestroy } from '@angular/core';
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
/**
 * `CinemasService` is a service class responsible for managing cinema-related data and interactions.
 * It extends the `BaseService` class and provides specific functionality for cinemas.
 */
export class CinemasService extends BaseService<Cinema> implements OnDestroy {
  /**
   * Endpoint URL for cinema-related API requests.
   */

  override endpoint = 'cinemas';
  /**
   * BehaviorSubject to hold and provide access to cinema parameters.
   * It allows components to observe and update cinema-related parameters.
   */
  cinemaParams$: BehaviorSubject<CinemaParams | null> =
    new BehaviorSubject<CinemaParams | null>(null);
  /**
   * Override of the `saveItem` method from the base service.
   * It conditionally saves a cinema item or a screen item based on the provided `type`.
   *
   * @param newItem - The new cinema or screen item to be saved.
   * @param type - Type indicating whether to save a cinema or screen. Defaults to cinema.
   * @param entityId - The unique identifier (ID) of the entity being updated (optional).
   * @returns An Observable of `null` indicating the success of the operation.
   */
  override saveItem(
    newItem: Cinema,
    type?: string,
    entityId?: number
  ): Observable<null> {
    if (type === EntityType.SCREEN) {
      return this.saveScreen(entityId!, newItem);
    }
    return this.http.put<null>(this.endpoint, newItem);
  }
  /**
   * Method to save a screen item associated with a cinema.
   *
   * @param cinemaId - The unique identifier (ID) of the cinema to which the screen is associated.
   * @param screen - The screen item to be saved.
   * @returns An Observable of `null` indicating the success of the operation.
   */
  saveScreen(cinemaId: number, screen: BaseEntity): Observable<null> {
    return this.http.put<null>(`${this.endpoint}/${cinemaId}/screens`, screen);
  }
  /**
   * Method to list screenings associated with a cinema.
   *
   * @param cinemaId - The unique identifier (ID) of the cinema.
   * @returns An Observable of `PageableResponse` containing a list of screenings.
   */
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
  /**
   * Method to set cinema parameters in the `cinemaParams$` BehaviorSubject.
   *
   * @param cinemaParams - The cinema parameters to be set.
   */

  setCinemaParams(cinemaParams: CinemaParams): void {
    this.cinemaParams$.next(cinemaParams);
  }

  /**
   * Method to get the current cinema parameters as an observable.
   *
   * @returns An Observable of `CinemaParams` or `null`.
   */
  getCurrentParams(): Observable<CinemaParams | null> {
    return this.cinemaParams$.asObservable();
  }
  /**
   * Method to retrieve the current cinema based on the stored cinema parameters.
   * It updates the `cinemaParams$` BehaviorSubject with the current cinema and parameters.
   */
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
  /**
   * Method to retrieve all screens associated with cinemas.
   *
   * @returns An Observable of `Screen` array.
   */
  getAllScrens(): Observable<Screen[]> {
    return this.getAllPages().pipe(
      map((response) => response.map((cinema) => cinema.screens).flat())
    );
  }
  /**
   * Method to create a screening for a specific cinema and screen.
   *
   * @param screening - The screening request data to be created.
   * @param cinemaId - The unique identifier (ID) of the cinema.
   * @param screenId - The unique identifier (ID) of the screen.
   * @returns An Observable of `null` indicating the success of the operation.
   */
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

  ngOnDestroy(): void {
    this.cinemaParams$.complete();
  }
}
