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
      ime: 'Leon',
      prezime: 'Cvetkovski',
      datumRodjenja: '2003-02-06',
      oib: '79879207653'
    })
      .then((result) => {
        const user = result.data;
        localStorage.setItem('user', user);
        this.navController.navigateRoot('activity-select');
      })
      .catch((error) => console.log('error', error));
  }
}
