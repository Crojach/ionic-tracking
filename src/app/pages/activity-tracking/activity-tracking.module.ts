import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityTrackingPageRoutingModule } from './activity-tracking-routing.module';

import { ActivityTrackingPage } from './activity-tracking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityTrackingPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ActivityTrackingPage]
})
export class ActivityTrackingPageModule {}
