import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { departamento } from '../../environments/global-route';
import { Response } from '../models/Response';
import { Departamento } from '../models/Departamento';
import {DepartamentoRest} from "@models/departamento-rest";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class DepartamentosService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + departamento.path;
  }

  obtenerDepartamentos(): Observable<DepartamentoRest[]> {
    return this.http.get<DepartamentoRest[]>(this.url);
  }

  // tslint:disable-next-line:typedef no-shadowed-variable
  guardar(departamento: DepartamentoRest) {
    return this.http.post<DepartamentoRest>(this.url, departamento);
  }

  // tslint:disable-next-line:typedef no-shadowed-variable
  actualizar(departamento: DepartamentoRest) {
    return this.http.put<DepartamentoRest>(this.url, departamento);
  }

  cambiarEstado(id: number) {
    return this.http.put<DepartamentoRest>(this.url + `/${id}`, null);
  }

  getAllDepartments() {
    return this.http.get<Departamento[]>(this.url);
  }

  getActive() {
    return this.http.get<Response>(this.url + departamento.active);
  }

  save(depto: Departamento) {
    return this.http.post<Response>(this.url, depto);
  }

  update(depto: Departamento) {
    return this.http.put<Response>(this.url, depto);
  }

  changeStatus(id: number) {
    console.log(this.url + departamento.status + `/${id}`);
    return this.http.put<Response>(
      this.url + departamento.status + `/${id}`,
      null
    );
  }
}
