import { BackgroundLocationService } from './../../services/background-location.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { User } from './../../../models/user';
import { HttpService } from './../../services/http/http.service';
import { DataFieldsService } from './../../services/data-fields.service';
import { ConsoleService } from './../../services/console.service';
import { Activity } from './../../../models/activity';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouteReuseStrategy } from '@angular/router';

import { DataField } from 'src/models/data-field';

import { AlertController, NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Insomnia } from '@ionic-native/insomnia/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Subscription } from 'rxjs';

declare var mapboxgl;

@Component({
  selector: 'app-activity-tracking',
  templateUrl: './activity-tracking.page.html',
  styleUrls: ['./activity-tracking.page.scss'],
})
export class ActivityTrackingPage implements OnInit {
  selectedActivity: Activity;

  activityStarted: boolean;

  startDate: Date;
  endDate: Date;

  time: number;
  timer: any;

  map: any;
  coordinates: Array<Array<number>>;
  geojson: any;
  isMapCreated: boolean;

  traveledDistance: number;

  totalAltitude: number;

  dataFields: Array<DataField>;

  currentLocation: any;
  previousLocation: any;

  currentAltitude: number;
  previousAltitude: number;

  readonly mpsToKmh = 3.6;
  readonly milesToKm = 1.609344;

  watchPositionSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private consoleService: ConsoleService,
    private dataFieldsService: DataFieldsService,
    private alertController: AlertController,
    private httpService: HttpService,
    private navController: NavController,
    private geolocation: Geolocation,
    private insomnia: Insomnia,
    private backgroundMode: BackgroundMode,
    private localNotifications: LocalNotifications,
    private backgroundLocationService: BackgroundLocationService) { }

  ngOnInit() {
    this.backgroundLocationService.subscribe().subscribe((data) => {
      if (!this.activityStarted) {
        return;
      }

      if (data.isBackground) {
        this.backgroundLocationService.clear();
        this.watchPositionSubscription.unsubscribe();
        return;
      }

      data.locations.forEach(location => {
        this.analzyeMovement(
          location.longitude,
          location.latitude,
          location.time,
          location.speed,
          location.altitude,
          true);
      });

      // this.addPointBatch(data.locations.map(location => {
      //   const subset = {
      //     lng: location.longitude,
      //     lat: location.latitude,
      //     time: location.time,
      //   };
      //   return subset;
      // }) as any);

      this.watchPosition();
    });
  }

  ionViewDidEnter() {
    this.isMapCreated = false;
    this.resetActivity(true);

    this.route.queryParams.subscribe(params => {
      this.selectedActivity = params.selectedActivity;
      this.dataFields = this.dataFieldsService.getDataFields(this.selectedActivity.sportType);
    });
  }

  async startActivity(): Promise<void> {
    this.time = 0;
    this.startDate = new Date();
    this.startTimer();

    this.watchPosition();
    this.backgroundLocationService.start();

    await this.insomnia.keepAwake();
  }

  async pauseActivity(): Promise<void> {
    this.activityStarted = false;
    clearTimeout(this.timer);

    this.backgroundLocationService.stop();

    await this.insomnia.allowSleepAgain();
  }

  async continueActivity(): Promise<void> {
    this.startTimer();

    this.backgroundLocationService.start();

    await this.insomnia.keepAwake();
  }

  async finishActivity(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Aktivnost završena!',
      message: 'Uspješno ste završili aktivnost. Želite li pohraniti aktivnost?',
      buttons: [
        {
          text: 'Ne',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
            this.resetActivity();
          }
        }, {
          text: 'Da',
          cssClass: 'success',
          handler: () => {
            this.saveActivity();
          }
        }
      ]
    });

    await alert.present();
  }

  private async showSuccess(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Aktivnost spremljena!',
      message: 'Vaša aktivnost uspješno je spremljena.',
      buttons: [{
        text: 'OK',
        handler: () => {
          this.navController.navigateForward('activity-list');
        }
      }
      ]
    });

    await alert.present();
  }

  private saveActivity(): void {
    this.endDate = new Date();

    // const user: User = JSON.parse(localStorage.getItem('user'));

    const activityDto = {
      token: 'ZaSadaJeOvoToken123',
      rubrika: 'pohraniRezultat',
      nazivAktivnosti: this.selectedActivity.naziv,
      osoba: '1707',
      aktivnost: 22,
      tip: this.selectedActivity.sportType,
      startVrijeme: this.startDate.toISOString(),
      krajVrijeme: this.endDate.toISOString(),
      trajanjeAktivnosti: new Date(this.time * 1000).toISOString().substr(11, 8),
      udaljenost: this.traveledDistance * this.milesToKm,
      koordinate: JSON.stringify(this.geojson.features[0].geometry.coordinates)
    };
    this.httpService.post('', '', activityDto).then(() => {
      // let activities: Array<any> = JSON.parse(localStorage.getItem('activities'));
      // if (activities === null) {
      //   activities = new Array<any>();
      // }
      // activities.push(activityDto);

      // localStorage.setItem('activities', JSON.stringify(activities));
      this.showSuccess();
    });

    this.resetActivity();
  }

  private resetActivity(isInitial: boolean = false) {
    this.activityStarted = false;
    this.time = 0;

    this.currentLocation = null;
    this.previousLocation = null;
    this.traveledDistance = 0;

    this.totalAltitude = 0;
    this.currentAltitude = null;
    this.previousAltitude = null;

    this.coordinates = new Array<Array<number>>();
    this.geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: []
          }
        }
      ]
    };

    if (!isInitial) {
      this.map.getSource('line').setData(this.geojson);
    }
  }

  private startTimer(): void {
    this.activityStarted = true;
    this.timer = setInterval(() => {
      this.time++;

      const elapsedTime = new Date(this.time * 1000).toISOString().substr(11, 8);

      this.setDataFields('time', elapsedTime);
    }, 1000);
  }

  private async createMap(lng: number, lat: number): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.isMapCreated = true;
        mapboxgl.accessToken = 'pk.eyJ1IjoiY3JvamFjaCIsImEiOiJjanpyZXlid3gwN2w3M29teDFqcHVhaDRwIn0.GscN6ezfC2mfwU-0EHMlwg';
        this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: 15
        });

        this.map.on('load', () => {
          this.consoleService.log('map created');
          this.map.addSource('line', {
            type: 'geojson',
            data: this.geojson
          });

          // add the line which will be modified in the animation
          this.map.addLayer({
            id: 'line-animation',
            type: 'line',
            source: 'line',
            layout: {
              'line-cap': 'round',
              'line-join': 'round'
            },
            paint: {
              'line-color': '#041872',
              'line-width': 5,
              'line-opacity': 0.8
            }
          });

          resolve();
        });

      } catch (error) {
        this.isMapCreated = false;
        this.consoleService.log('error creating map', error);
        reject();
      }
    });
  }

  private async centerMap(lng: number, lat: number, timestamp: number, addPoint: boolean = true): Promise<void> {
    if (!this.isMapCreated) {
      await this.createMap(lng, lat);
    }

    this.map.panTo([lng, lat]);

    if (addPoint) {
      this.addPoint(lng, lat, timestamp);
    }
  }

  private watchPosition() {
    this.watchPositionSubscription =
      this.geolocation.watchPosition({ enableHighAccuracy: true })
        .subscribe((position: any) => {
          if (!position || !this.activityStarted) {
            return;
          }
          this.analzyeMovement(
            position.coords.longitude,
            position.coords.latitude,
            position.timestamp,
            position.coords.speed,
            position.coords.altitude);
        });
  }

  private async analzyeMovement(
    longitude: number,
    latitude: number,
    time: number,
    speed: number,
    altitude: number,
    addPoint: boolean = true): Promise<void> {
    const convertedSpeed = speed
      ? Number(speed * this.mpsToKmh)
      : 0;
    this.setDataFields('speed', convertedSpeed.toFixed(1));

    const pace = speed
      ? 60 / convertedSpeed
      : 0;

    const paceMinutes = Math.floor(pace);
    const paceSeconds = Math.round((pace - paceMinutes) * 60);

    this.setDataFields('pace', `${paceMinutes}:${paceSeconds < 10 ? '0' + paceSeconds : paceSeconds}`);

    await this.centerMap(longitude, latitude, time, addPoint);

    if (this.currentLocation) {
      this.previousLocation = {
        latitude: this.currentLocation.latitude,
        longitude: this.currentLocation.longitude
      };
    }

    this.currentLocation = {
      longitude,
      latitude
    };

    if (this.previousLocation !== null && this.currentLocation !== null) {
      const distance = this.calculateDistance(
        this.previousLocation.latitude,
        this.previousLocation.longitude,
        this.currentLocation.latitude,
        this.currentLocation.longitude
      );

      this.traveledDistance += distance;

      this.setDataFields(
        'distance',
        (this.traveledDistance * this.milesToKm).toFixed(1)
      );
    }

    this.previousAltitude = this.currentAltitude;
    this.currentAltitude = altitude;

    if (this.previousAltitude !== null && this.currentAltitude !== null) {
      const altitudeChange = this.currentAltitude - this.previousAltitude;

      if (altitudeChange > 0) {
        this.totalAltitude += altitudeChange;
      }

      this.setDataFields(
        'altitude',
        (this.totalAltitude * this.milesToKm).toFixed(1)
      );
    }
  }

  private async getCurrentPosition() {
    const position = await this.geolocation.getCurrentPosition();
    if (!position) {
      return;
    }

    this.currentLocation = position.coords;
    this.createMap(position.coords.longitude, position.coords.latitude);
  }

  private addPoint(lng: number, lat: number, timestamp: number): void {
    this.geojson.features[0].geometry.coordinates.push([lng, lat, timestamp]);
    const source = this.map.getSource('line');
    if (source) {
      source.setData(this.geojson);
    }
  }

  private addPointBatch(points: Array<{ lng: number, lat: number, timestamp: number }>): void {
    this.geojson.features[0].geometry.coordinates.push(...points);
    const source = this.map.getSource('line');
    if (source) {
      source.setData(this.geojson);
    }
  }

  private setDataFields(id: string, value: string): void {
    const data = this.dataFields.find(x => x.id === id);
    if (data) {
      data.value = value;
    }
  }

  private calculateDistance(lat1, lon1, lat2, lon2) {
    if ((lat1 === lat2) && (lon1 === lon2)) {
      return 0;
    }
    else {
      const radlat1 = Math.PI * lat1 / 180;
      const radlat2 = Math.PI * lat2 / 180;
      const theta = lon1 - lon2;
      const radtheta = Math.PI * theta / 180;
      let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      // dist = dist * 1.609344;
      return dist;
    }
  }

  private showStatus(text: string) {
    this.localNotifications.schedule({
      id: 1,
      text: 'Single ILocalNotification',
      sound: 'file://sound.mp3',
      data: { secret: 'key' }
    });
  }
}
