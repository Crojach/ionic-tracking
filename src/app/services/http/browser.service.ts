import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpBrowserService {
  constructor(private httpClient: HttpClient) { }

  async get(controller: string, endpoint: string = '', queryParams: {} = {}, apendQueryParams): Promise<any> {
    const queryString = this.generateQueryString(queryParams);
    const url = `${environment.baseUrl}/${controller}/${endpoint}${queryString.length > 0
      ? '?' + queryString
      : apendQueryParams
        ? queryParams
        : ''
      }`;
    const headers = await this.getHeader();

    return this.httpClient.get(url, headers);
  }

  async post(controller: string, endpoint: string = '', payload: any): Promise<any> {
    const url = `${environment.baseUrl}`;
    const headers = await this.getHeader();

    return this.httpClient.post(url, payload, headers);

  }

  // async put(controller: string, id: number, payload: any): Promise<any> {
  //   const url = `${environment.baseUrl}/${controller}/${id}`;
  //   const headers = await this.getHeader();
  //   const { Http } = Plugins;

  //   return Http.request({
  //     method: 'PUT',
  //     url,
  //     headers,
  //     data: payload
  //   });
  // }

  // async delete(controller: string, id: number): Promise<any> {
  //   const url = `${environment.baseUrl}/${controller}/${id}`;
  //   const headers = await this.getHeader();
  //   const { Http } = Plugins;

  //   return Http.request({
  //     method: 'DELETE',
  //     url,
  //     headers
  //   });
  // }

  // async patch(controller: string, id: number, method: string, value: any): Promise<any> {
  //   const url = `${environment.baseUrl}/${controller}/${id}/${method}`;
  //   const headers = await this.getHeader();
  //   const { Http } = Plugins;

  //   return Http.request({
  //     method: 'PATCH',
  //     url,
  //     headers,
  //     data: value
  //   });
  // }

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
      //       return resolve({
      //         'Content-Type': 'application/json',
      //       });
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
