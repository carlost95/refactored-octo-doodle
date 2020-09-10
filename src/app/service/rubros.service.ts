import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { rubro } from '../../environments/global-route';
import { Response } from '../modelo/Response';
import { Rubro } from '../modelo/Rubro';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + rubro.path;
  }
  // tslint:disable-next-line: typedef
  listarRubrosTodos() {
    return this.http.get<Response>(this.url);
  }
  // tslint:disable-next-line: typedef
  listarRubrosHabilitados() {
    return this.http.get<Response>(this.url + '/habilitados');
  }
  // tslint:disable-next-line: typedef
  guardarRubro(rubro: Rubro) {
    return this.http.post<Response>(this.url, rubro);
  }
  // tslint:disable-next-line: typedef
  actualizarRubro(rubro: Rubro) {
    return this.http.put<Response>(this.url, rubro);
  }
  // tslint:disable-next-line: typedef
  listarRubroId(id: number) {
    return this.http.get<Response>(this.url + id);
  }
  // tslint:disable-next-line: typedef
  cambiarHabilitacion(id: number) {
    return this.http.put<Response>(this.url + '/' + id, id);
  }
}