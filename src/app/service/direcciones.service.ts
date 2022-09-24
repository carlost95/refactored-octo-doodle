import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { direccion } from '../../environments/global-route';
import { Direccion } from '../models/Direccion';
import { Response } from '../models/Response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DireccionesService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + direccion.path;
  }
  getAllDirectionByClientId(clientId: number): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(this.url + '/cliente/' + clientId);
  }
  getAllEnabledDirectionByIdClient(id: number): Observable<Direccion[]> {
    return this.http.get<Direccion[]>(this.url + '/enabled/cliente/' + id);
  }
  getDirectionById(id: number): Observable<Direccion> {
    return this.http.get<Direccion>(this.url + '/' + id);
  }
  updatedDirection(direction: Direccion): Observable<Direccion> {
    return this.http.put<Direccion>(this.url, direction);
  }
  saveDirection(direction: Direccion): Observable<Direccion> {
    return this.http.post<Direccion>(this.url, direction);
  }

  changeStatusDirection(id: number): Observable<Direccion> {
    return this.http.put<Direccion>(this.url + '/' + id, id);
  }

  // TODO: Eliminar metodos
  getByClientId(clientId: number) {
    return this.http.get<Response>(this.url + `/${clientId}`);
  }

  save(direccion: Direccion) {
    return this.http.post<Response>(this.url, direccion);
  }

  update(direccion: Direccion) {
    return this.http.put<Response>(this.url, direccion);
  }

  // changeStatus(direction: Direccion) {
  //   console.log(this.url + direccion.status);
  //   return this.http.put<Response>(this.url + direccion.status, direction);
  // }
}