import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { TableBaseModule } from 'src/app/components/table-base/table-base.module';
import { MaterialModule } from 'src/app/material.module';
import { BookingRoutingModule } from './booking-routing.module';
import { ListComponent } from './list/list.component';
import { AddBookingComponent } from './add-booking/add-booking.component';

@NgModule({
  declarations: [ListComponent, AddBookingComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    ReactiveFormsModule,
    TableBaseModule,
    MaterialModule,
  ],
})
export class BookingModule {}
