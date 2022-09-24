import { Component } from '@angular/core';
import { MapService } from '../../../service/map.service';
import { PlaceService } from '@app/service/place.service';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.scss']
})
export class BtnMyLocationComponent {

  constructor(
    private mapService: MapService,
    private placeService: PlaceService) { }
  goToLocation() {
    console.log(this.placeService.userLocation);

    if (!this.placeService.isUserLocationReady)
      throw new Error("No hay ubicacion de usuario");

    if (!this.mapService.isMapReady)
      throw new Error("No se ha inicializado el mapa");

    this.mapService.flyTo(this.placeService.userLocation!);

  }
}
