import { Activity, ParentActivity } from './../../../models/activity';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { BackgroundLocationService } from 'src/app/services/background-location.service';

@Component({
  selector: 'app-activity-select',
  templateUrl: './activity-select.page.html',
  styleUrls: ['./activity-select.page.scss'],
})
export class ActivitySelectPage implements OnInit {
  selectedActivity: Activity;
  parentActivities: Array<ParentActivity>;
  constructor(
    private navController: NavController,
    private httpService: HttpService,
    public backgroundLocationService: BackgroundLocationService
  ) { }

  ngOnInit() {
    // const user = JSON.parse(localStorage.getItem('user'));

    // if (user === null) {
    //   this.navController.navigateRoot('login');
    //   return;
    // }

    this.httpService.post('', '', {
      token: 'ZaSadaJeOvoToken123',
      rubrika: 'dohvatiAktivnosti',
      osoba: '1707', // user.iskaznicaBroj,
      brojIskaznice: '3212618321920' // user.id
    })
      .then((result) => {
        const activities = JSON.parse(result.data) as Array<Activity>;

        this.parentActivities = new Array<ParentActivity>();

        activities.forEach(activity => {
          let parent = this.parentActivities.find(x => x.id === activity.nadaktivnostId);

          if (parent === undefined) {
            parent = new ParentActivity(activity.nadaktivnostId, activity.nadaktivnostNaziv);
            this.parentActivities.push(parent);
          }

          parent.activities.push(activity);
        });
      })
      .catch((error) => console.log('error', error));
  }

  startActivity(): void {
    const payload: NavigationExtras = {
      queryParams: {
        selectedActivity: this.selectedActivity
      }
    };
    this.navController.navigateForward('activity-tracking', payload);
  }

  select(activity: Activity) {
    this.selectedActivity = activity;

    this.backgroundLocationService.initialize();
  }
}
