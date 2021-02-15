import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivityTrackingPage } from './activity-tracking.page';

const routes: Routes = [
  {
    path: '',
    component: ActivityTrackingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityTrackingPageRoutingModule {}
