import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'cinemas',
    loadChildren: () =>
      import('src/app/modules/cinema/cinema.module').then(
        (m) => m.CinemaModule
      ),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('src/app/modules/movies/movies.module').then(
        (m) => m.MoviesModule
      ),
  },
  {
    path: 'bookings',
    loadChildren: () =>
      import('src/app/modules/booking/booking.module').then(
        (m) => m.BookingModule
      ),
  },
  {
    path: 'screenings',
    loadChildren: () =>
      import('src/app/modules/screening/screening.module').then(
        (m) => m.ScreeningModule
      ),
  },
  // {
  //   path: '**',
  //   redirectTo: 'dashboard',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
