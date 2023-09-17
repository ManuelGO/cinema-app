import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookingPageComponent } from './add-booking-page/add-booking-page.component';
import { BookingsListPageComponent } from './bookings-list-page/bookings-list-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BookingsListPageComponent,
      },
      {
        path: 'add-booking',
        component: AddBookingPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
