import { Cinema } from './../../../core/models/cinema';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
 cinema!: Cinema;
 constructor(private router: Router) {
  this.cinema = this.router.getCurrentNavigation()?.extras.state as Cinema;
 }
}
