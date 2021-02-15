import { AlertController, NavController } from '@ionic/angular';
import { ToastService } from '../../services/toast.service';
import { SportType } from './../../../models/enums/sport-type';
import { DataFieldsService } from '../../services/data-fields.service';
import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/core';
import { DataField } from 'src/models/data-field';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  SportType = SportType;

  selectedSportType: SportType;
  dataFields: Array<DataField>;
  constructor(
    public dataFieldsService: DataFieldsService,
    public toastService: ToastService,
    public alertController: AlertController,
    public navController: NavController
  ) { }

  ngOnInit() {
    this.setSportType(SportType.Cycling);
  }

  selectionChanged(sportType: SportType): void {
    this.setSportType(sportType);
  }

  reorder(ev: CustomEvent<ItemReorderEventDetail>): void {
    this.dataFields = ev.detail.complete(this.dataFields);
  }

  saveOrder(): void {
    this.dataFieldsService.setDataFields(this.selectedSportType, this.dataFields);

    this.toastService.showToast('Postavke uspješno spremljene')
  }

  async logout(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Odjava',
      message: 'Želite li se sigurno odjaviti iz aplikacije?',
      buttons: [
        {
          text: 'Ne',
          role: 'cancel',
          handler: () => { }
        }, {
          text: 'Da',
          cssClass: 'danger',
          handler: () => {
            this.navController.navigateRoot('login');
          }
        }
      ]
    });

    await alert.present();
  }

  private setSportType(sportType: SportType): void {
    this.selectedSportType = sportType;
    this.dataFields = this.dataFieldsService.getDataFields(this.selectedSportType);
  }
}
