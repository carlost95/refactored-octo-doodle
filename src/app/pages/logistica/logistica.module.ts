import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LogisticaRoutingModule } from "./logistica-routing.module";
import { MapaComponent } from "./mapa/mapa.component";
import { LogisticaComponent } from "./logistica.component";
import { GoogleMapsModule } from "@angular/google-maps";

@NgModule({
  declarations: [MapaComponent, LogisticaComponent],
  // imports: [CommonModule, LogisticaRoutingModule],
  imports: [CommonModule, LogisticaRoutingModule, GoogleMapsModule],
})
export class LogisticaModule {}
