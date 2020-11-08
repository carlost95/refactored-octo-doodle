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

  guardarDistrito(distrito: Distrito) {
    return this.http.post<Distrito>(this.url + "/", distrito);
  }

  actualizarDistrito(distrito: Distrito) {
    console.log("Actualizar");

    console.log(distrito);

    return this.http.put<Distrito>(this.url, distrito);
  }

  listarDistritoId(id: number) {
    return this.http.get<Response>(this.url + "/" + id);
  }

  desabilitarDistrito(id: number) {
    return this.http.delete(this.url + "/" + id);
  }

  changeStatus(id: number) {
    return this.http.put<Response>(this.url + distrito.status + `/${id}`, null);
  }
}
