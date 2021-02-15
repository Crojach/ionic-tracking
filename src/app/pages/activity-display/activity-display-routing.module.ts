import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityDisplayPage } from './activity-display.page';

const routes: Routes = [
  {
    path: '',
    component: ActivityDisplayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityDisplayPageRoutingModule {}
