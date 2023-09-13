import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
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
  ],
})
export class ScreeningModule {}
