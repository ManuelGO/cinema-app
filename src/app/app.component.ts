import { Component } from '@angular/core';
import { MoviesService } from './core/services/movies/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private movies: MoviesService) {}
  title = 'cinema-app';
}
