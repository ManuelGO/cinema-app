import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinemaDetailsPageComponent } from './cinema-details-page/cinema-details-page.component';
import { CinemasListPageComponent } from './cinemas-list-page/cinemas-list-page.component';

const routes: Routes = [
  {
    path: '',
    component: CinemasListPageComponent,
  },
  {
    path: ':id',
    component: CinemaDetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CinemaRoutingModule {}
