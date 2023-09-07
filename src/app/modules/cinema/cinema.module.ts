import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SearchInputModule } from 'src/app/components/search-input/search-input.module';
import { TableBaseModule } from 'src/app/components/table-base/table-base.module';
import { MaterialModule } from 'src/app/material.module';
import { CinemaRoutingModule } from './cinema-routing.module';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent, DetailsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CinemaRoutingModule,
    TableBaseModule,
    SearchInputModule,
  ],
})
export class CinemaModule {}
