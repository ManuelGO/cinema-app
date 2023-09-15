import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { TableBaseModule } from '../table-base/table-base.module';
import { MoviesListComponent } from './movies-list.component';

@NgModule({
  declarations: [MoviesListComponent],
  exports: [MoviesListComponent],
  imports: [MaterialModule, CommonModule, RouterModule, TableBaseModule],
})
export class MoviesListModule {}
