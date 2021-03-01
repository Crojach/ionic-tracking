import { HttpService } from 'src/app/services/http/http.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivityDto, ParentActivityDto } from 'src/models/activityDto';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.page.html',
  styleUrls: ['./activity-list.page.scss'],
})
export class ActivityListPage implements OnInit {
  activities: Array<any>;
  parentActivities: Array<ParentActivityDto>;
  constructor(
    private navController: NavController,
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.activities = JSON.parse(localStorage.getItem('activities'));

    this.httpService.post('', '', {
      token: 'ZaSadaJeOvoToken123',
      rubrika: 'dohvatiRezultate',
      osoba: '1707', // user.iskaznicaBroj
    })
      .then((result) => {

        console.log('duvaj', result.data)
        const activities = JSON.parse(result.data) as Array<ActivityDto>;

        this.parentActivities = new Array<ParentActivityDto>();

        activities.forEach(activity => {
          let parent = this.parentActivities.find(x => x.id === activity.nadaktivnostId);

          if (parent === undefined) {
            parent = new ParentActivityDto(activity.nadaktivnostId, activity.nadaktivnostNaziv);
            this.parentActivities.push(parent);
          }

          parent.activities.push(activity);
        });
      })
      .catch((error) => console.log('error', error));
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
