import { SportType } from './enums/sport-type';

export class ParentActivity {
  id: number;
  naziv: string;

  activities: Array<Activity>;

  constructor(
    id: number,
    naziv: string) {
    this.id = id;
    this.naziv = naziv;
    this.activities = new Array<Activity>();
  }
}
export class Activity {
  id: number;
  naziv: string;
  kraj: Date;
  pocetak: Date;
  nadaktivnostId: number;
  nadaktivnostNaziv: string;
  pracenjeAktivnosti: boolean;

  icon: string;

  sportType: SportType;

  constructor(
    id: number,
    naziv: string,
    pocetak: Date,
    kraj: Date,
    nadaktivnostId: number,
    nadaktivnostNaziv: string,
    pracenjeAktivnosti: boolean,
    icon: string,
    sportType: SportType) {
    this.id = id;
    this.naziv = naziv;
    this.kraj = kraj;
    this.pocetak = pocetak;
    this.nadaktivnostId = nadaktivnostId;
    this.nadaktivnostNaziv = nadaktivnostNaziv;
    this.pracenjeAktivnosti = pracenjeAktivnosti;

    this.icon = icon;
    this.sportType = sportType;
  }
}
