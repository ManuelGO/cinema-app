import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { TableBaseModule } from 'src/app/components/table-base/table-base.module';
import { MaterialModule } from 'src/app/material.module';
import { MovieRoutingModule } from './movie-routing.module';
import { MoviesListPageComponent } from './movies-list-page/movies-list-page.component';

@NgModule({
  declarations: [MoviesListPageComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    TableBaseModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class MovieModule {}
