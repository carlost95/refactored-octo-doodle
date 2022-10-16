import { Component, OnInit } from '@angular/core';
import {MapService, PlaceService} from '../../service';
import {LogisticaService} from '../../service/logistica.service';

@Component({
  selector: 'app-logistica',
  templateUrl: './logistica.component.html',
  styleUrls: ['./logistica.component.css']
})
export class LogisticaComponent implements OnInit {

  paradas: any[] = [];
  private paradasAVisitar: any[] = [];

  constructor(private placeService: PlaceService,
              private logisticaService: LogisticaService,
              private mapService: MapService) {}

  ngOnInit() {
    this.logisticaService.getParadas().subscribe(paradas => this.paradas = paradas);
  }

  get isUserLocationReady(): boolean {
    return this.placeService.isUserLocationReady;
  }

  agregarParada(parada: any): void {
    this.paradasAVisitar.push(parada);
    this.mapService.flyTo([parada.longitud, parada.latitud]);
    this.mapService.updateMarker([parada.longitud, parada.latitud], '#ffc107');
  }

  trazarRuta() {
    const mapa = new Map(this.paradasAVisitar.map((object, index) => {
      return [index, object];
    }));
    const paradas = this.paradasAVisitar.map( (parada, index) => ({...parada, numero: index }));
    console.log(paradas)
    this.logisticaService.getDistancesFromMapbox(paradas).subscribe(result => {
      console.log('distances from mapbox')
      console.log(result)
      const distancias = {distancia : result.distances };
      this.logisticaService.obtenerRutaYDistanciaRecorrida(distancias).subscribe(({parada, distancia}) => {
        const ruta = parada.map(p => mapa.get(p));
        console.log(ruta)
        this.logisticaService.getRouteFromMapbox(ruta).subscribe(r => {
          this.mapService.drawRoute(r)
          this.mapService.updateMarkers(ruta.slice(0, -1))
        });
        console.log(mapa)
        console.log(ruta);
      });
    });
  }
}
