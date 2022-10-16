import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { MapService } from '@app/service/map.service';
import { PlaceService } from '@app/service/place.service';
import { Map, Marker } from 'mapbox-gl';
import {LogisticaService} from '../../../service/logistica.service';

@Component({
  selector: 'app-view-map',
  templateUrl: './view-map.component.html',
  styleUrls: ['./view-map.component.scss']
})
export class ViewMapComponent implements AfterViewInit {
  @ViewChild('mapDiv') mapDivElement!: ElementRef;
  @Output('markerChange') ubication: EventEmitter<[number, number]> =
    new EventEmitter<[number, number]>();
  @Input() draggable = true;

  constructor(
    private placeService: PlaceService,
    private mapService: MapService,
    private logisticaService: LogisticaService
  ) {
  }

  ngAfterViewInit(): void {
    if (!this.placeService.userLocation) {
      throw new Error('No hay placesService.userLocation');
    }
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
    console.log('map');
    const markers = [];
    this.logisticaService.getParadas().subscribe(locaciones => {
      locaciones.forEach(locacion => {
        const marker = new Marker({ color: 'blue', draggable: this.draggable })
          .setLngLat([locacion.longitud, locacion.latitud]);
        this.mapService.setMarker(marker)
        marker.addTo(map);
      });
      this.mapService.setMap(map);
    });


    // TODO: Se define el marcador inicial del mapa
    // const marker = new Marker({ color: 'blue', draggable: this.draggable })
    //   .setLngLat(this.placeService.userLocation)
    //   .addTo(map);

    // TODO: Se establece el mapa en el servicio y tenemos acceso global

    // TODO: listener que actualiza la ubicacion del marcador
    // marker.on('drag', () => {
    //   this.ubication.emit(marker.getLngLat().toArray() as [number, number]);
    // });
  }


}
