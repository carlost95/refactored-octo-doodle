import { MapService } from './../../../service/map.service';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PlaceService } from '@app/service/place.service';
import { Map, Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(
    private placeService: PlaceService,
    private mapService: MapService
  ) {
  }

  ngAfterViewInit(): void {
    if (!this.placeService.userLocation)
      throw new Error('No hay placesService.userLocation');
    // TODO: se crea el mapa
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.placeService.userLocation,
      zoom: 14,
    });
    map.on('style.load', () => {
      map.setFog({});
    });
    // TODO: Se define el Popup 
    const popup = new Popup().setHTML(
      `<h6>Ubicacion Actual</h6>`
    );
    //TODO: Se define el marcador inicial del mapa
    new Marker({ color: 'red' })
      .setLngLat(this.placeService.userLocation)
      .setPopup(popup)
      .addTo(map);


    // TODO: Se establece el mapa en el servicio y tenemos acceso global
    this.mapService.setMap(map);

  }
}
