import { Activity } from './../../../models/activity';
import { SelectorPage } from './selector/selector.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { SportType } from 'src/models/enums/sport-type';

@Component({
  selector: 'app-activity-select',
  templateUrl: './activity-select.page.html',
  styleUrls: ['./activity-select.page.scss'],
})
export class ActivitySelectPage implements OnInit {
  selectedActivity: Activity;
  activities: Array<Activity>;
  constructor(
    // private modalController: ModalController,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.activities = new Array<Activity>();

    this.activities.push(new Activity(1, 'Biciklom u školu', 'bicycle-outline', SportType.Cycling));
    this.activities.push(new Activity(2, '5k cross', 'walk-outline', SportType.Running));
    this.activities.push(new Activity(3, 'Vožnja biciklom', 'bicycle-outline', SportType.Cycling));
    this.activities.push(new Activity(4, 'Trčanje', 'walk-outline', SportType.Running));
  }

  // async showActivitySelector(): Promise<void> {
  //   const modal = await this.modalController.create({
  //     component: SelectorPage,
  //   });

  //   await modal.present();

  //   const { data } = await modal.onWillDismiss();
  //   this.selectedActivity = data;
  // }

  startActivity(): void {
    const payload: NavigationExtras = {
      queryParams: {
        selectedActivity: this.selectedActivity
      }
    };
    this.navController.navigateForward('activity-tracking', payload);
  }

  select(id: number) {
    this.selectedActivity = this.activities.find(x => x.id === id);
  }
}
