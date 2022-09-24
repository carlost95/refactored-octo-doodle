import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LogisticaRoutingModule } from "./logistica-routing.module";
import { LogisticaComponent } from "./logistica.component";
import { ScreenMapComponent } from './screens/screen-map/screen-map.component';
import { LoadingComponent } from './loading/loading.component';
import { MapViewComponent } from './map-view/map-view.component';
import { BtnMyLocationComponent } from './btn-my-location/btn-my-location.component';

@NgModule({
  declarations: [
    LogisticaComponent,
    ScreenMapComponent,
    LoadingComponent,
    MapViewComponent,
    BtnMyLocationComponent],
  imports: [
    CommonModule,
    LogisticaRoutingModule,
  ],
  exports: [
    ScreenMapComponent,
    LoadingComponent,
    MapViewComponent]
})
export class LogisticaModule { }
