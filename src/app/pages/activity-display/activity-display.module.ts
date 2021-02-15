import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivityDisplayPageRoutingModule } from './activity-display-routing.module';

import { ActivityDisplayPage } from './activity-display.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivityDisplayPageRoutingModule
  ],
  declarations: [ActivityDisplayPage]
})
export class ActivityDisplayPageModule {}
