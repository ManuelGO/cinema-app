import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CinemasListModule } from 'src/app/components/cinemas-list/cinemas-list.module';
import { TableBaseModule } from 'src/app/components/table-base/table-base.module';
import { MaterialModule } from 'src/app/material.module';
import { AddBookingComponent } from './add-booking/add-booking.component';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingsListPageComponent } from './bookings-list-page/bookings-list-page.component';

@NgModule({
  declarations: [AddBookingComponent, BookingsListPageComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    ReactiveFormsModule,
    TableBaseModule,
    MaterialModule,
    CinemasListModule,
  ],
})
export class BookingModule {}
