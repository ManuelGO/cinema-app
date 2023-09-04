import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/core/models/movie';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  movie!: Movie;
  constructor(private router: Router) {
    this.movie = this.router.getCurrentNavigation()?.extras.state as Movie;
  }
}
