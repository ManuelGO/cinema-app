import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { TableBaseComponent } from './table-base.component';

@NgModule({
  declarations: [TableBaseComponent],
  exports: [TableBaseComponent],
  imports: [MaterialModule, CommonModule, RouterModule],
})
export class TableBaseModule {}
