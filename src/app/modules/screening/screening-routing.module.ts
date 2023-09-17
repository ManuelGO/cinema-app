import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddScreeningPageComponent } from './add-screening-page/add-screening-page.component';

const routes: Routes = [
  {
    path: '',
    component: AddScreeningPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreeningRoutingModule {}
