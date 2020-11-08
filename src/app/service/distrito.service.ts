import {Injectable} from '@angular/core';
import {Response} from "../models/Response";
import {Distrito} from "../models/Distrito";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {departamento, distrito} from "../../environments/global-route";

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + distrito.path;
  }

  getDistritos(){
    return this.http.get<Response>(this.url);
  }

  listarDistritosHabilitados() {
    return this.http.get<Response>(this.url + "/habilitado");
  }

  save(distrito: Distrito){
    return this.http.post<Response>(this.url, distrito);
  }


  changeStatus(id: number) {
    return this.http.put<Response>(this.url + distrito.status + `/${id}`, null);
  }

  update(distrito: Distrito) {
    return this.http.put<Response>(this.url, distrito);
  }
}
