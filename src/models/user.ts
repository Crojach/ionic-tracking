export class User {
  id: number;
  ime: string;
  prezime: string;
  datumRodjenja: string;
  oib: number;
  iskaznicaTip: number;
  iskaznicaBroj: number;

  constructor(
    id: number,
    ime: string,
    prezime: string,
    datumRodjenja: string,
    oib: number,
    iskaznicaTip: number,
    iskaznicaBroj: number) {
    this.id = id;
    this.ime = ime;
    this.prezime = prezime;
    this.datumRodjenja = datumRodjenja;
    this.oib = oib;
    this.iskaznicaTip = iskaznicaTip;
    this.iskaznicaBroj = iskaznicaBroj;
  }
}
