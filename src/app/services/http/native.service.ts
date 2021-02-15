import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpNativeService {
  constructor(private http: HTTP) { }

  async get(controller: string, endpoint: string = '', queryParams: {} = {}, apendQueryParams = false) {
    const queryString = this.generateQueryString(queryParams);
    const header = await this.getHeader();
    return this.http.get(
      `${environment.baseUrl}/${controller}/${endpoint}${queryString.length > 0
        ? '?' + queryString
        : apendQueryParams
          ? queryParams
          : ''
      }`,
      '',
      header
    );
  }

  async post(controller: string, endpoint: string = '', payload: any) {
    const url = `${environment.baseUrl}/${controller}/${endpoint}`;
    const header = await this.getHeader();
    return this.http.post(url, payload, header);
  }

  async put(controller: string, id: number, payload: any) {
    const header = await this.getHeader();
    return this.http.put(
      `${environment.baseUrl}/${controller}/${id}`,
      payload,
      header
    );
  }

  async delete(controller: string, id: number) {
    const header = await this.getHeader();
    return this.http.delete(
      `${environment.baseUrl}/${controller}/${id}`,
      '',
      header
    );
  }

  async patch(controller: string, id: number, method: string, value: any) {
    this.http.setDataSerializer('json');
    const header = await this.getHeader();
    return this.http.patch(
      `${environment.baseUrl}/${controller}/${id}/${method}`,
      value,
      header
    );
  }

  private generateQueryString(object: any): string {
    const str = [];
    for (const property in object) {
      if (object.hasOwnProperty(property) && object[property]) {
        str.push(
          encodeURIComponent(property) +
          '=' +
          encodeURIComponent(object[property])
        );
      }
    }
    return str.join('&');
  }

  private getHeader(): Promise<any> {
    const promise = new Promise<any>((resolve, reject) => {
      resolve({});
      // this.storageService
      //   .getAuthToken()
      //   .then((token: string) => {
      //     if (!token) {
      //       return resolve({});
      //     }

      //     const header = {
      //       Authorization: `Bearer ${token}`,
      //       'Content-Type': 'application/json',
      //     };

      //     resolve(header);
      //   })
      //   .catch(() =>
      //     resolve({
      //       'Content-Type': 'application/json',
      //     })
      //   );
    });

    return promise;
  }
}
