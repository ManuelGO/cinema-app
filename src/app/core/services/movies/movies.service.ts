import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie';
import { BaseService } from '../base-service';

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends BaseService<Movie> {
  override endpoint = 'movies'
  readonly moreParams = {
    pageable: {
      pageNumber: 1
    }
  }


}
