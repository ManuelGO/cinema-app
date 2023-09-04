import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';

import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
 const modules = [
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatListModule,
  MatCardModule,
  MatGridListModule,
  MatMenuModule,
  MatTableModule,
  MatPaginatorModule,
]
@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule { }
