import { Component, Input, OnInit } from '@angular/core';
import { DataField } from 'src/models/data-field';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss'],
})
export class DataDisplayComponent implements OnInit {
  @Input() dataFields: Array<DataField>;
  constructor() { }

  ngOnInit() { }

  ionViewDidEnter() {
    console.log('datafields', this.dataFields)
  }
}
