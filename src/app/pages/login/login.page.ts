import { ConsoleService } from './../../services/console.service';
import { HttpService } from './../../services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private navController: NavController,
    private menuController: MenuController,
    private httpService: HttpService,
    private consoleService: ConsoleService
  ) { }

  ngOnInit() {
    this.menuController.enable(false);
  }

  login(): void {
    this.menuController.enable(true);
    this.httpService.post('', '', {
      token: 'ZaSadaJeOvoToken123',
      rubrika: 'login',
      brojIskaznice: '4098047451920',
      oib: '56263421087',
      tipOsobe: '3'
    })
      .then((result) => {
        const user = result.data;
        localStorage.setItem('user', user);
        this.navController.navigateRoot('activity-select');
      })
      .catch((error) => console.log('error', error));
  }
}
