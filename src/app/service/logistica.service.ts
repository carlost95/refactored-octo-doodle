import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { logistica, mapbox } from '../../environments/global-route';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogisticaService {
  private url: string;
  private mapboxMatrixUrl: string;
  private mapboxDirectionsUrl: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + logistica.path;
    this.mapboxMatrixUrl = environment.mapbox + mapbox.matrix;
    this.mapboxDirectionsUrl = environment.mapbox + mapbox.directions;
  }

  getParadas(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }


  getDistancesFromMapbox(paradasAVisitar: any[]): Observable<any> {
    const locations = paradasAVisitar.map(({ latitud, longitud }) => ({ latitud, longitud }));
    const urlLocations = this.generateUrlLocations(locations);
    const curbs = paradasAVisitar.map(parada => 'curb;').join('').slice(0, -1);
    return this.http.get<any>(`${this.mapboxMatrixUrl}/${urlLocations}`, {
      params: {
        approaches: curbs,
        annotations: 'distance',
        access_token: environment.apikey
      }
    })
  }

  generateUrlLocations(locations: any[]) {
    return locations.reduce((prev, cur) => {
      const location = `${cur.longitud},${cur.latitud}`;
      return prev === '' ? location : `${prev};${location}`;
    }, '');
  }

  obtenerRutaYDistanciaRecorrida(matrixDistancia: any) {
    return this.http.post<any>(this.url, matrixDistancia);
  }

  getRouteFromMapbox(ruta: any[]): Observable<any> {
    const locations = ruta.map(({ latitud, longitud }) => ({ latitud, longitud }));
    const urlLocations = this.generateUrlLocations(locations);
    return this.http.get<any>(`${this.mapboxDirectionsUrl}/${urlLocations}`, {
      params: {
        geometries: 'geojson',
        language: 'es',
        overview: 'simplified',
        access_token: environment.apikey
      }
    });
  }


}
