import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {direccion} from "../../environments/global-route";
import {Response} from "../modelo/Response";
import {Direccion} from "../modelo/Direccion";

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + direccion.path;
  }

  getByClientId(clientId: number){
    return this.http.get<Response>(this.url + `/${clientId}`);
  }

  save(direccion: Direccion){
    return this.http.post<Response>(this.url, direccion);
  }

  update(direccion: Direccion){
    return this.http.put<Response>(this.url, direccion);
  }
}
