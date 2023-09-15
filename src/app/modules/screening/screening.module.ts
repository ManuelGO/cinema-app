import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { CinemasListModule } from 'src/app/components/cinemas-list/cinemas-list.module';
import { TableBaseModule } from 'src/app/components/table-base/table-base.module';
import { MaterialModule } from 'src/app/material.module';
import { AddScreeningComponent } from './add-screening/add-screening.component';
import { ScreeningRoutingModule } from './screening-routing.module';

@NgModule({
  declarations: [AddScreeningComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TableBaseModule,
    ScreeningRoutingModule,
    CinemasListModule,
  ],
})
export class ScreeningModule {}
