import { SportType } from './../../../../models/enums/sport-type';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/models/activity';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.page.html',
  styleUrls: ['./selector.page.scss'],
})
export class SelectorPage implements OnInit {
  activities: Array<Activity>;
  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() {

  }

  select(id: number) {
    this.modalController.dismiss(this.activities.find(x => x.id === id));
  }

  dismiss(data?: Activity) {
    this.modalController.dismiss(data);
  }
}
