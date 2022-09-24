import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { MapService } from '@app/service/map.service';
import { PlaceService } from '@app/service/place.service';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'view-map',
  templateUrl: './view-map-client.component.html',
  styleUrls: ['./view-map-client.component.scss']
})
export class ViewMapClientComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  @Output('markerChange') ubication: EventEmitter<[number, number]> =
    new EventEmitter<[number, number]>();
  @Input() draggable = true;

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

    //TODO: Se define el marcador inicial del mapa
    let marker = new Marker({ color: 'blue', draggable: this.draggable })
      .setLngLat(this.placeService.userLocation)
      .addTo(map);

    // TODO: Se establece el mapa en el servicio y tenemos acceso global
    this.mapService.setMap(map);

    // TODO: listener que actualiza la ubicacion del marcador
    marker.on('drag', () => {
      this.ubication.emit(marker.getLngLat().toArray() as [number, number]);
    });
  }

}