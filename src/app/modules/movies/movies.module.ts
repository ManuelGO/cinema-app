import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { TableBaseModule } from 'src/app/components/table-base/table-base.module';
import { MaterialModule } from 'src/app/material.module';
import { ListComponent } from './list/list.component';
import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    TableBaseModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class MoviesModule {}
