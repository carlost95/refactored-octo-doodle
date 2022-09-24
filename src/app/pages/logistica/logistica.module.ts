import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LogisticaRoutingModule } from "./logistica-routing.module";
import { MapaComponent } from "./mapa/mapa.component";
import { LogisticaComponent } from "./logistica.component";
import { GoogleMapsModule } from "@angular/google-maps";
import { ScreenMapComponent } from './screens/screen-map/screen-map.component';
import { LoadingComponent } from './loading/loading.component';
import { MapViewComponent } from './map-view/map-view.component';
import { BtnMyLocationComponent } from './btn-my-location/btn-my-location.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MapaComponent,
    LogisticaComponent,
    ScreenMapComponent,
    LoadingComponent,
    MapViewComponent,
    BtnMyLocationComponent],
  imports: [
    CommonModule,
    LogisticaRoutingModule,
    GoogleMapsModule],
  exports: [
    ScreenMapComponent,
    LoadingComponent,
    MapViewComponent]
})
export class LogisticaModule { }
