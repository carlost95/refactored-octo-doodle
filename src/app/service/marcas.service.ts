import { Injectable } from '@angular/core';
import { Response } from '../models/Response';
import { Marca } from '../models/Marca';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { marca } from '../../environments/global-route';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  Url: string;

  constructor(private http: HttpClient) {
    this.Url = environment.url + marca.path;
  }
  // SERVICE DE MARCAS
  // tslint:disable-next-line: typedef
  listarMarcaTodos() {
    return this.http.get<Response>(this.Url);
    // return this.http.get<Response>('../../assets/mocks/marca.json');
  }
  // tslint:disable-next-line: typedef
  listarMarcaHabilitados() {
    return this.http.get<Response>(this.Url + '/habilitados');
  }
  // tslint:disable-next-line: typedef
  cambiarHabilitacion(id: number) {
    return this.http.put<Response>(this.Url + '/' + id, id);
  }
  // tslint:disable-next-line: typedef
  guardarMarca(marca: Marca) {
    return this.http.post<Response>(this.Url + '/', marca);
    // return this.http.post<Response>('../../assets/mocks/marca.json', marca.);
  }
  // tslint:disable-next-line: typedef
  actualizarMarca(marca: Marca) {
    return this.http.put<Response>(this.Url, marca);
  }
  // tslint:disable-next-line: typedef
  listarMarcaId(id: number) {
    return this.http.get<Response>(this.Url + id);
  }
  // tslint:disable-next-line: typedef
  deshabilitarMarca(id: number) {
    return this.http.delete(this.Url + id);
  }
}
