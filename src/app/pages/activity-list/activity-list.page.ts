import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.page.html',
  styleUrls: ['./activity-list.page.scss'],
})
export class ActivityListPage implements OnInit {
  activities: Array<any>;
  constructor(
    private navController: NavController
  ) { }

  ngOnInit() {
    this.activities = JSON.parse(localStorage.getItem('activities'));
  }

  open(activity: any) {
    const payload: NavigationExtras = {
      queryParams: {
        activity
      }
    };
    this.navController.navigateForward('activity-display', payload);
  }
}
