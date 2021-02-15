import { SportType } from './../../models/enums/sport-type';
import { Injectable } from '@angular/core';
import { DataField } from 'src/models/data-field';

@Injectable({
  providedIn: 'root'
})
export class DataFieldsService {

  constructor() { }

  getDataFields(sport: SportType): Array<DataField> {
    let result = new Array<DataField>();

    const dataFields = localStorage.getItem(SportType[sport]);
    if (dataFields) {
      result = JSON.parse(dataFields);
      result = this.checkForMissingFields(result);
    } else {
      result = this.getDefaults();
    }

    return result;
  }

  setDataFields(sport: SportType, dataFields: Array<DataField>): void {
    localStorage.setItem(SportType[sport], JSON.stringify(dataFields));
  }

  private getDefaults(): Array<DataField> {
    const result = new Array<DataField>();
    result.push(new DataField('time', 'Vrijeme', '00:00:00', '', true));
    result.push(new DataField('distance', 'Udaljenost', '0.0', 'km', true));
    result.push(new DataField('speed', 'Brzina', '0.0', 'km/h', true));
    result.push(new DataField('pace', 'Tempo', '0:00', 'min/km', true));
    result.push(new DataField('elevation', 'Uspon', '0', 'm', true));
    return result;
  }

  private checkForMissingFields(dataFields: Array<DataField>): Array<DataField> {
    const result = [...dataFields];

    const pace = this.checkAndCreateMissingField(result, 'pace', 'Tempo', '0:00', 'min/km', true);
    if (pace) {
      result.push(pace);
    }

    const elevation = this.checkAndCreateMissingField(result, 'elevation', 'Uspon', '0', 'm', true);
    if (elevation) {
      result.push(elevation);
    }
    return result;
  }

  private checkAndCreateMissingField(
    dataFields: Array<DataField>,
    id: string,
    title: string,
    value: string,
    unit: string,
    isVisible: boolean): DataField {
    const dataField = dataFields.find(x => x.id === id);

    if (dataField) {
      return null;
    }

    return new DataField(id, title, value, unit, isVisible);
  }
}
