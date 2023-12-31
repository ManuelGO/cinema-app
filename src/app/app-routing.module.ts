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
    path: 'screens',
    loadChildren: () =>
      import('src/app/modules/screen/screen.module').then(
        (m) => m.ScreenModule
      ),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('src/app/modules/movie/movie.module').then((m) => m.MovieModule),
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
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
