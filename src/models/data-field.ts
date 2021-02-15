export class DataField {
  id: string;
  title: string;
  value: string;
  unit: string;
  isVisible: boolean;

  constructor(id: string, title: string, value: string, unit: string, isVisible: boolean) {
    this.id = id;
    this.title = title;
    this.value = value;
    this.unit = unit;
    this.isVisible = isVisible;
  }
}
