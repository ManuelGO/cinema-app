import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CinemaRoutingModule } from './cinema-routing.module';
import { ListComponent } from './list/list.component';
import { MaterialModule } from 'src/app/material.module';
import { TableBaseComponent } from 'src/app/components/table-base/table-base.component';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    ListComponent,
    TableBaseComponent,
    DetailsComponent,

  ],
  imports: [
    CommonModule,
    MaterialModule,
    CinemaRoutingModule
  ]
})
export class CinemaModule { }
