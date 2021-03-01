import { SportType } from './enums/sport-type';

export class ParentActivityDto {
  id: number;
  naziv: string;

  activities: Array<ActivityDto>;

  constructor(
    id: number,
    naziv: string) {
    this.id = id;
    this.naziv = naziv;
    this.activities = new Array<ActivityDto>();
  }
}
export class ActivityDto {
  aktivnost: number;
  nazivAktivnosti: string;
  krajVrijeme: Date;
  startVrijeme: Date;
  nadaktivnostId: number;
  nadaktivnostNaziv: string;
  koordinate: string;
  trajanjeAktivnosti: string;
  udaljenost: string;

  // icon: string;

  // sportType: SportType;

  constructor(
    aktivnost: number,
    nazivAktivnosti: string,
    startVrijeme: Date,
    krajVrijeme: Date,
    nadaktivnostId: number,
    nadaktivnostNaziv: string,
    koordinate: string,
    trajanjeAktivnosti: string,
    udaljenost: string
    // icon: string,
    // sportType: SportType
  ) {
    this.aktivnost = aktivnost;
    this.nazivAktivnosti = nazivAktivnosti;
    this.krajVrijeme = krajVrijeme;
    this.startVrijeme = startVrijeme;
    this.nadaktivnostId = nadaktivnostId;
    this.nadaktivnostNaziv = nadaktivnostNaziv;
    this.koordinate = koordinate;
    this.trajanjeAktivnosti = trajanjeAktivnosti;
    this.udaljenost = udaljenost;

    // this.icon = icon;
    // this.sportType = sportType;
  }
}
