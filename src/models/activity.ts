import { SportType } from './enums/sport-type';
export class Activity {
  id: number;
  name: string;
  icon: string;

  sportType: SportType;

  constructor(id: number, name: string, icon: string, sportType: SportType) {
    this.id = id;
    this.name = name;
    this.icon = icon;
    this.sportType = sportType;
  }
}
