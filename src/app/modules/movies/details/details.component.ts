import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from 'src/app/core/models/movie';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  movie!: Movie;
  form!: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) {
    this.movie = this.router.getCurrentNavigation()?.extras.state as Movie;
  }
  ngOnInit(): void {}
}
