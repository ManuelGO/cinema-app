import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { SearchInputComponent } from './search-input.component';

@NgModule({
  declarations: [SearchInputComponent],
  exports: [SearchInputComponent],
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule],
})
export class SearchInputModule {}
