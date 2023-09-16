import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TableBaseModule } from 'src/app/components/table-base/table-base.module';
import { ScreenRoutingModule } from './screen-routing.module';
import { ScreensListPageComponent } from './screens-list-page/screens-list-page.component';

@NgModule({
  declarations: [ScreensListPageComponent],
  imports: [CommonModule, TableBaseModule, ScreenRoutingModule],
})
export class ScreenModule {}
