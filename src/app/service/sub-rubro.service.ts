import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SubRubroDTO } from '../modelo/SubRubroDTO';
import { environment } from '../../environments/environment.prod';
import { subRubro } from '../../environments/global-route';
import { Response } from '../modelo/Response';

@Injectable({
  providedIn: 'root'
})
export class SubRubroService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + subRubro.path;
  }
  // tslint:disable-next-line: typedef
  listarSubRubrosTodos() {
    return this.http.get<Response>(this.url);
  }
  // tslint:disable-next-line: typedef
  listarSubRubrosHabilitados() {
    return this.http.get<Response>(this.url + '/habilitados');
  }
  // tslint:disable-next-line: typedef
  listarSubRubrosPorIdRubro(id: number) {
    return this.http.get<Response>(this.url + '/rubro/' + id);
  }
  // tslint:disable-next-line: typedef
  guardarSubRubro(subRubroDTO: SubRubroDTO) {
    return this.http.post<SubRubroDTO>(this.url, subRubroDTO);
  }
  // tslint:disable-next-line: typedef
  actualizarSubRubro(subRubroDTO: SubRubroDTO) {
    return this.http.put<SubRubroDTO>(this.url, subRubroDTO);
  }
  // tslint:disable-next-line: typedef
  listarSubRubroId(id: number) {
    return this.http.get<Response[]>(this.url + id);
  }
  // tslint:disable-next-line: typedef
  cambiarHabilitacion(id: number) {
    return this.http.put<Response>(this.url + '/' + id, id);
  }
}
