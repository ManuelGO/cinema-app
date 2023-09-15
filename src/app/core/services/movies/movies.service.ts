import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { BaseService } from '../base-service';

@Injectable({
  providedIn: 'root',
})
export class MoviesService extends BaseService<Movie> {
  override endpoint = 'movies';
  override saveItem(
    item: Movie,
    type?: string | undefined,
    entityId?: number | undefined
  ): Observable<null> {
    return this.http.put<null>(this.endpoint, item);
  }
}
