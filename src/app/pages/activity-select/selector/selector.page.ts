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
    this.activities = new Array<Activity>();

    this.activities.push(new Activity(1, 'Biciklom u školu', 'bicycle-outline', SportType.Cycling));
    this.activities.push(new Activity(2, '5k cross', 'walk-outline', SportType.Running));
    this.activities.push(new Activity(3, 'Vožnja biciklom', 'bicycle-outline', SportType.Cycling));
    this.activities.push(new Activity(4, 'Trčanje', 'walk-outline', SportType.Running));
  }

  select(id: number) {
    this.modalController.dismiss(this.activities.find(x => x.id === id));
  }

  dismiss(data?: Activity) {
    this.modalController.dismiss(data);
  }
}
