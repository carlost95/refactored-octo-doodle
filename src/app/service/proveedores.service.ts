import { Injectable } from '@angular/core';
import { Response } from '../modelo/Response';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Proveedor } from '../modelo/Proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  Url = environment.url;

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line: typedef
  listarProveedoresTodos() {
    return this.http.get<Response>(this.Url + '/proveedores');
  }
  // tslint:disable-next-line: typedef
  listarProveedoresHabilitados() {
    return this.http.get<Response>(this.Url + '/proveedores/habilitados');
  }
  // tslint:disable-next-line: typedef
  guardarProveedor(proveedor: Proveedor) {
    return this.http.post<Proveedor>(this.Url + '/proveedores/', proveedor);
  }
  // tslint:disable-next-line: typedef
  cambiarHabilitacion(id: number) {
    return this.http.put<Response>(this.Url + '/' + id, id);
  }
  // tslint:disable-next-line: typedef
  deshabilitarProveedor(id: number) {
    return this.http.delete(this.Url + '/proveedores/' + id);
  }
  // tslint:disable-next-line: typedef
  actualizarProveedor(proveedor: Proveedor) {
    return this.http.put<Response>(this.Url + '/Proveedores/', Proveedor);
  }
  // tslint:disable-next-line: typedef
  listarProveedorId(id: number) {
    return this.http.get<Response>(this.Url + '/Proveedores/' + id);
  }
}
