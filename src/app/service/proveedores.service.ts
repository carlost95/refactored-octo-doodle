import { Injectable } from '@angular/core';
import { Response } from '../models/Response';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../models/Proveedor';
import { proveedor } from '../../environments/global-route';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + proveedor.path;
  }
  // tslint:disable-next-line: typedef
  listarProveedoresTodos() {
    return this.http.get<Response>(this.url);
  }
  // tslint:disable-next-line: typedef
  listarProveedoresHabilitados() {
    return this.http.get<Response>(this.url + '/habilitados');
  }
  // tslint:disable-next-line: typedef
  guardarProveedor(proveedor: Proveedor) {
    return this.http.post<Response>(this.url + '/', proveedor);
  }
  // tslint:disable-next-line: typedef
  cambiarHabilitacion(id: number) {
    return this.http.put<Response>(this.url + '/' + id, id);
  }
  // tslint:disable-next-line: typedef
  deshabilitarProveedor(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
  // tslint:disable-next-line: typedef
  actualizarProveedor(proveedor: Proveedor) {
    return this.http.put<Response>(this.url + '/', proveedor);
  }
  // tslint:disable-next-line: typedef
  listarProveedorId(id: number) {
    return this.http.get<Response>(this.url + '/' + id);
  }
}
