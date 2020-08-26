import { Injectable } from '@angular/core';
import { Response } from '../modelo/Response';
import { Marca } from './../modelo/Marca';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  Url = environment.url;

  constructor(private http: HttpClient) { }
  // SERVICE DE MARCAS
  // tslint:disable-next-line: typedef
  listarMarcaTodos() {
    return this.http.get<Response>(this.Url + '/marcas');
    // return this.http.get<Response>('../../assets/mocks/marca.json');
  }
  // tslint:disable-next-line: typedef
  listarMarcaHabilitados() {
    return this.http.get<Response>(this.Url + '/marcas/habilitados');
    // return this.http.get<Response>('../../assets/mocks/marca.json');
  }
  // tslint:disable-next-line: typedef
  cambiarHabilitacion(id: number) {
    return this.http.put<Response>(this.Url + '/' + id, id);
  }
  // tslint:disable-next-line: typedef
  guardarMarca(marca: Marca) {
    return this.http.post<Response>(this.Url + '/marcas/', marca);
    // return this.http.post<Response>('../../assets/mocks/marca.json', marca.);
  }
  // tslint:disable-next-line: typedef
  actualizarMarca(marca: Marca) {
    return this.http.put<Response>(this.Url + '/marcas/', marca);
  }
  // tslint:disable-next-line: typedef
  listarMarcaId(id: number) {
    return this.http.get<Response>(this.Url + '/marcas/' + id);
  }
  // tslint:disable-next-line: typedef
  deshabilitarMarca(id: number) {
    return this.http.delete(this.Url + '/marcas/' + id);
  }
}