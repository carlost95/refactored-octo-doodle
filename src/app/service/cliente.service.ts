import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {cliente} from "../../environments/global-route";
import {Response} from "../modelo/Response";

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

  save(client: any) {
    return this.http.post<Response>(this.url, client);
  }

}
