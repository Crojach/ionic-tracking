import { ServiceStatus } from './../../../plugins/cordova-plugin-background-geolocation/www/BackgroundGeolocation.d';
import { Injectable } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackgroundLocationService {
  readonly config: BackgroundGeolocationConfig = {
    desiredAccuracy: 0,
    stationaryRadius: 20,
    distanceFilter: 30,
    debug: false,
    interval: 2000,
    stopOnTerminate: false,
    notificationTitle: 'Školski sportski savez Grada Zagreba',
    notificationText: 'Praćenje aktivnosti je u tijeku'
  };

  private subject = new Subject<any>();

  constructor(
    private backgroundGeolocation: BackgroundGeolocation
  ) { }

  initialize(): void {
    this.backgroundGeolocation.configure(this.config)
      .then(() => {
        this.backgroundGeolocation.start();
        this.backgroundGeolocation
          .on(BackgroundGeolocationEvents.location)
          .subscribe((location: BackgroundGeolocationResponse) => {
            this.backgroundGeolocation.startTask().then((taskKey) => {
              this.backgroundGeolocation.endTask(taskKey);
            });
          });
      });

    this.backgroundGeolocation
      .on(BackgroundGeolocationEvents.background)
      .subscribe(() => {
        this.subject.next({
          isBackground: true
        });
      });

    this.backgroundGeolocation
      .on(BackgroundGeolocationEvents.foreground)
      .subscribe(() => {
        this.backgroundGeolocation.getLocations()
          .then((locations: Array<BackgroundGeolocationResponse>) => {
            this.subject.next({
              isBackground: false,
              locations
            });

            this.backgroundGeolocation.deleteAllLocations()
              .then((response) => {

              });
          });
      });
  }

  subscribe(): Subject<any> {
    return this.subject;
  }

  start(): void {
    this.backgroundGeolocation.checkStatus().then((serviceStatus: ServiceStatus) => {
      if (!serviceStatus.isRunning) {
        this.backgroundGeolocation.start();
      }
    });
  }

  stop(): void {
    this.backgroundGeolocation.stop();
  }

  clear(): void {
    this.backgroundGeolocation.deleteAllLocations()
      .then((response) => {
      });
  }

  openAppSettings(): void {
    this.backgroundGeolocation.showAppSettings();
  }

  openLocationSettings(): void {
    this.backgroundGeolocation.showLocationSettings();
  }
}
