import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticaRoutingModule } from './logistica-routing.module';
import { LogisticaComponent } from './logistica.component';
import { ScreenMapComponent } from './screens/screen-map/screen-map.component';
import { LoadingComponent } from './loading/loading.component';
import { ViewMapComponent } from './view-map/view-map.component';
import { BtnMyLocationComponent } from './btn-my-location/btn-my-location.component';
import { CardParadaComponent } from './components/card-parada/card-parada.component';

@NgModule({
  declarations: [
    LogisticaComponent,
    ScreenMapComponent,
    LoadingComponent,
    ViewMapComponent,
    BtnMyLocationComponent,
    CardParadaComponent],
  imports: [
    CommonModule,
    LogisticaRoutingModule,
  ],
  exports: [
    ScreenMapComponent,
    LoadingComponent,
    ViewMapComponent]
})
export class LogisticaModule { }
