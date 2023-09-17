import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CinemasListModule } from 'src/app/components/cinemas-list/cinemas-list.module';
import { DateTimePickerModule } from 'src/app/components/date-time-picker/date-time-picker.module';
import { MoviesListModule } from 'src/app/components/movies-list/movies-list.module';
import { TableBaseModule } from 'src/app/components/table-base/table-base.module';
import { MaterialModule } from 'src/app/material.module';
import { AddScreeningPageComponent } from './add-screening-page/add-screening-page.component';
import { ScreeningRoutingModule } from './screening-routing.module';

@NgModule({
  declarations: [AddScreeningPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TableBaseModule,
    ScreeningRoutingModule,
    CinemasListModule,
    MoviesListModule,
    DateTimePickerModule,
  ],
})
export class ScreeningModule {}
