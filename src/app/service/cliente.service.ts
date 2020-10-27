import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {cliente} from "../../environments/global-route";
import {Response} from "../models/Response";
import {Cliente} from "../models/Cliente";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + cliente.path;
  }

  getAll() {
    return this.http.get<Response>(this.url);
  }

  save(client: Cliente) {
    return this.http.post<Response>(this.url, client);
  }

  update(client: Cliente) {
    return this.http.put<Response>(this.url, client);
  }

  changeStatus(id: number){
    console.log(this.url + cliente.status + `/${id}`)
    return this.http.put<Response>(this.url + cliente.status + `/${id}`, null);
  }

}
