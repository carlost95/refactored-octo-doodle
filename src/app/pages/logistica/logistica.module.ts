import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticaRoutingModule } from './logistica-routing.module';
import { LogisticaComponent } from './logistica.component';
import { LoadingComponent } from './loading/loading.component';
import { ViewMapComponent } from './view-map/view-map.component';
import { CardParadaComponent } from './components/card-parada/card-parada.component';

@NgModule({
  declarations: [
    LogisticaComponent,
    LoadingComponent,
    ViewMapComponent,
    CardParadaComponent],
  imports: [
    CommonModule,
    LogisticaRoutingModule,
  ],
  exports: [
    LoadingComponent,
    ViewMapComponent]
})
export class LogisticaModule { }
