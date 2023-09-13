import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScreeningComponent } from './add-screening/add-screening.component';

const routes: Routes = [
  {
    path: '',
    component: AddScreeningComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreeningRoutingModule {}
