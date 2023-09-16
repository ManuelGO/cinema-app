import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreensListPageComponent } from './screens-list-page/screens-list-page.component';

const routes: Routes = [{ path: '', component: ScreensListPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreenRoutingModule {}
