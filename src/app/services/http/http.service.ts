import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpBrowserService } from './browser.service';
import { HttpNativeService } from './native.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private platform: Platform,
    private httpNativeService: HttpNativeService,
    private httpBrowserService: HttpBrowserService) { }
  get(controller: string, endpoint: string = '', queryParams: {} = {}, apendQueryParams = false) {
    if (this.platform.is('cordova')) {
      return this.httpNativeService.get(controller, endpoint, queryParams, apendQueryParams);
    } else {
      return this.httpBrowserService.get(controller, endpoint, queryParams, apendQueryParams);
    }
  }

  post(controller: string, endpoint: string = '', payload: any) {
    if (this.platform.is('cordova')) {
      return this.httpNativeService.post(controller, endpoint, payload);
    } else {
      return this.httpBrowserService.post(controller, endpoint, payload);
    }
  }

  // put(controller: string, id: number, payload: any) {
  //   if (this.platform.is('cordova')) {
  //     return this.httpNativeService.put(controller, id, payload);
  //   } else {
  //     return this.httpBrowserService.put(controller, id, payload);
  //   }
  // }

  // delete(controller: string, id: number) {
  //   if (this.platform.is('cordova')) {
  //     return this.httpNativeService.delete(controller, id);
  //   } else {
  //     return this.httpBrowserService.delete(controller, id);
  //   }
  // }

  // patch(controller: string, id: number, method: string, value: any) {
  //   if (this.platform.is('cordova')) {
  //     return this.httpNativeService.patch(controller, id, method, value);
  //   } else {
  //     return this.httpBrowserService.patch(controller, id, method, value);
  //   }
  // }
}
