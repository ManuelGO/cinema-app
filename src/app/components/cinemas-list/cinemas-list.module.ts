import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { TableBaseModule } from '../table-base/table-base.module';
import { CinemasListComponent } from './cinemas-list.component';

@NgModule({
  declarations: [CinemasListComponent],
  exports: [CinemasListComponent],
  imports: [MaterialModule, CommonModule, RouterModule, TableBaseModule],
})
export class CinemasListModule {}
