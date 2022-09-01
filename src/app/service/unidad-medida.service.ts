import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { unidadMedida } from '../../environments/global-route';
import { Response } from '../models/Response';
import { UnidadMedida } from '../models/UnidadMedida';
import {Observable} from 'rxjs';
import {UnidadMedidaRest} from '@models/unidad-medida-rest';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.url + unidadMedida.path;
  }

  obtenerUnidadesMedida(): Observable<UnidadMedidaRest[]> {
    return this.http.get<UnidadMedidaRest[]>(this.url);
  }

  cambiarEstado(id: number): Observable<UnidadMedidaRest> {
    return this.http.put<UnidadMedidaRest>(this.url + '/' + id, id);
  }

  guardar(unidadDeMedida: UnidadMedidaRest): Observable<UnidadMedidaRest> {
    return this.http.post<UnidadMedidaRest>(this.url, unidadDeMedida);
  }

  actualizar(unidadDeMedida: UnidadMedidaRest): Observable<UnidadMedidaRest> {
    console.log(this.url);
    return this.http.put<UnidadMedidaRest>(this.url, unidadDeMedida);
  }

  // tslint:disable-next-line: typedef
  listarUnidadMedidaTodos() {
    return this.http.get<Response>(this.url);
  }
  // tslint:disable-next-line: typedef
  listarUnidadMedidaHabilitados() {
    return this.http.get<Response>(this.url + '/habilitados');
  }
  // tslint:disable-next-line: typedef
  guardarUnidadMedida(unidadMedida: UnidadMedida) {
    return this.http.post<Response>(this.url, unidadMedida);
  }
  // tslint:disable-next-line: typedef
  actualizarUnidadMedida(unidadMedida: UnidadMedida) {
    return this.http.put<Response>(this.url, unidadMedida);
  }
  // tslint:disable-next-line: typedef
  listarUnidadMedidaId(id: number) {
    return this.http.get<Response>(this.url + id);
  }

  // tslint:disable-next-line: typedef
  cambiarHabilitacion(id: number) {
    return this.http.put<Response>(this.url + '/' + id, id);
  }



}
