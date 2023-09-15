import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { Movie } from '../../models/movie';
import { BaseService } from '../base-service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService extends BaseService<Movie> {
  override saveItem(
    item: Movie,
    type?: string | undefined,
    entityId?: number | undefined
  ): Observable<null> {
    throw new Error('Method not implemented.');
  }
  override endpoint = 'movies';

  public testRequest() {
    // return throwError('This is an error!').pipe(delay(2000));
    return of({
      title: 'Simulating HTTP Requests',
      content: 'This is off the hook!!',
    }).pipe(delay(2000));
  }
}
