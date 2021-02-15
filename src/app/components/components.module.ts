import { DataDisplayComponent } from './data-display/data-display.component';
import { NgModule } from '@angular/core';

const components = [
  DataDisplayComponent
];

@NgModule({
  imports: [],
  declarations: components,
  exports: components
})
export class ComponentsModule { }
