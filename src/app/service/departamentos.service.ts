import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {cliente, departamento} from "../../environments/global-route";
import {Response} from "../models/Response";
import {Departamento} from "../models/Departamento";

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + departamento.path;
  }

  getAll() {
    return this.http.get<Response>(this.url);
  }

  save(depto: Departamento) {
    return this.http.post<Response>(this.url, depto);
  }

  update(depto: Departamento) {
    return this.http.put<Response>(this.url, depto);
  }

  changeStatus(id: number){
    console.log(this.url + departamento.status + `/${id}`)
    return this.http.put<Response>(this.url + departamento.status + `/${id}`, null);
  }
}
