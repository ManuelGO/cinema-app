import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CinemasListModule } from 'src/app/components/cinemas-list/cinemas-list.module';
import { TableBaseModule } from 'src/app/components/table-base/table-base.module';
import { MaterialModule } from 'src/app/material.module';
import { CinemaDetailsPageComponent } from './cinema-details-page/cinema-details-page.component';
import { CinemaRoutingModule } from './cinema-routing.module';
import { CinemasListPageComponent } from './cinemas-list-page/cinemas-list-page.component';

@NgModule({
  declarations: [CinemasListPageComponent, CinemaDetailsPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    CinemaRoutingModule,
    TableBaseModule,
    CinemasListModule,
  ],
})
export class CinemaModule {}
