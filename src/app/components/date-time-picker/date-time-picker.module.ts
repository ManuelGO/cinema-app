import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { DateTimePickerComponent } from './date-time-picker.component';

@NgModule({
  declarations: [DateTimePickerComponent],
  exports: [DateTimePickerComponent],
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule],
})
export class DateTimePickerModule {}
