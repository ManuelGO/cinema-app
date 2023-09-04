import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TableBaseModule } from 'src/app/components/table-base/table-base.module';
import { ListComponent } from './list/list.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [ListComponent, DetailsComponent],
  imports: [CommonModule, MoviesRoutingModule, TableBaseModule],
})
export class MoviesModule {}
