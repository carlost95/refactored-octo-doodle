import { Injectable } from '@angular/core';
import { Response } from "../models/Response";
import { Distrito } from "../models/Distrito";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";
import { departamento, distrito } from "../../environments/global-route";
import { DistritoRest } from "@models/distrito-rest";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + distrito.path;
  }

  obtenerDistritos(): Observable<DistritoRest[]> {
    return this.http.get<DistritoRest[]>(this.url);
  }

  // tslint:disable-next-line:no-shadowed-variable
  guardar(distrito: DistritoRest): Observable<DistritoRest> {
    return this.http.post<DistritoRest>(this.url, distrito);
  }

  // tslint:disable-next-line:no-shadowed-variable
  actualizar(distrito: DistritoRest): Observable<DistritoRest> {
    return this.http.put<DistritoRest>(this.url, distrito);
  }

  cambiarEstado(id: number): Observable<DistritoRest> {
    return this.http.put<DistritoRest>(`${this.url}/${id}`, null);
  }

  listarDistritosHabilitados(): Observable<DistritoRest[]> {
    return this.http.get<DistritoRest[]>(this.url + "/habilitado");
  }

  save(distrito: Distrito) {
    return this.http.post<Response>(this.url, distrito);
  }


  changeStatus(id: number) {
    return this.http.put<Response>(this.url + distrito.status + `/${id}`, null);
  }

  update(distrito: Distrito) {
    return this.http.put<Response>(this.url, distrito);
  }
}
