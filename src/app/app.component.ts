import { User } from './../models/user';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public user: User;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Nova aktivnost',
      url: '/activity-select',
      icon: 'bicycle'
    },
    {
      title: 'Moje aktivnosti',
      url: '/activity-list',
      icon: 'list'
    },
    {
      title: 'Postavke',
      url: '/settings',
      icon: 'settings'
    }
  ];
  constructor( ) {
    const user = localStorage.getItem('user');

    if (user) {
      this.user = JSON.parse(user);
    }
  }
}
