import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SearchInputModule } from 'src/app/components/search-input/search-input.module';
import { TableBaseModule } from 'src/app/components/table-base/table-base.module';
import { MaterialModule } from 'src/app/material.module';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { MoviesRoutingModule } from './movies-routing.module';

@NgModule({
  declarations: [ListComponent, DetailsComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    TableBaseModule,
    MaterialModule,
    SearchInputModule,
    ReactiveFormsModule,
  ],
})
export class MoviesModule {}
