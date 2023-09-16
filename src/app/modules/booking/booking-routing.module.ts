import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookingComponent } from './add-booking/add-booking.component';
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
        component: AddBookingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingRoutingModule {}
