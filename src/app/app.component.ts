import { Component } from '@angular/core';
import { MoviesService } from './core/services/movies/movies.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private movies: MoviesService) {
    const params = new HttpParams().set('size',10).set('page',3)

    this.movies.getPaginatedList(params).subscribe(l => console.log(l))
  }
  title = 'cinema-app';
}
