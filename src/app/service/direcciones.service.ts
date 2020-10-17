import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {direccion} from "../../environments/global-route";
import {Response} from "../modelo/Response";

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
}
