import { Injectable } from '@angular/core';
import {Response} from "../modelo/Response";
import {Banco} from "../modelo/Banco";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {banco} from "../../environments/global-route";

@Injectable({
  providedIn: 'root'
})
export class BancosService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url =environment.url + banco.path;

  }

  listarBancosTodos() {
    return this.http.get<Response>(this.url);
  }
  guardarBanco(banco: Banco) {
    return this.http.post<Response>(this.url , banco);
  }
  actualizarBanco(banco: Banco) {
    return this.http.put<Response>(this.url , banco);
  }
  cambiarHabilitacion(id: number) {
    return this.http.put<Response>(this.url+ "/" + id , id);
  }
  listarBancoId(id: number) {
    return this.http.get<Response>(this.url + "/" + id);
  }
}
