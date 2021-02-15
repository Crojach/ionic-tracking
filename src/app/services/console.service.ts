import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {

  constructor() { }

  log(text: string, data?: any) {
    console.log('-------------------------');
    console.log('-------------------------');
    console.log(text, data);
    console.log('-------------------------');
    console.log('-------------------------');
  }
}
