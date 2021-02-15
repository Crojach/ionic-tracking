import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivitySelectPageRoutingModule } from './activity-select-routing.module';

import { ActivitySelectPage } from './activity-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivitySelectPageRoutingModule
  ],
  declarations: [ActivitySelectPage]
})
export class ActivitySelectPageModule {}
