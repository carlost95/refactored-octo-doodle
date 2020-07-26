import { TipoDireccion } from './../modelo/tipoDireccion';
import { Cliente } from "./../modelo/Cliente";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Response } from "../modelo/Response";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class VentasService {

  Url = environment.url;

  constructor(private http: HttpClient) {}



  // *********************SERVICE CLIENTE********************

  // listarClientesTodos() {
  //   let nombreUsuario='jorgedat';
  //   let password='carlito';

  //   const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(nombreUsuario + ':' + password) });
  //   return this.http.get<Response>('http://localhost:8081/clientes',{headers});
  // }

  listarClientesTodos() {
    return this.http.get<Response>(this.Url + "/clientes");
  }
  listarClientesHabilitados() {
    return this.http.get<Response>(this.Url + "/clientes/habilitados");
  }
  guardarCliente(cliente: Cliente) {
    return this.http.post<Cliente>(this.Url + "/clientes/", cliente);
  }
  listarClienteId(id: number) {
    return this.http.get<Response>(this.Url + "/clientes/" + id);
  }
  actualizarCliente(cliente: Cliente) {
    return this.http.put<Cliente>(this.Url + "/clientes/", cliente);
  }
  deshabilitarCliente(id: number) {
    return this.http.delete(this.Url + "/clientes/" + id);
  }
  // *********************SERVICE TIPO DIRECCION********************
  listarTipoDireccionTodos() {
    return this.http.get<Response>(this.Url + "/tipo-direccion");
  }
  listarTipoDireccionHabilitados() {
    return this.http.get<Response>(this.Url + "/tipo-direccion/habilitados");
  }
  listarTipoDireccionId(id: number) {
    return this.http.get<Response>(this.Url + "/tipo-direccion/" + id);
  }
  guardarTipoDireccion(tipoDireccion: TipoDireccion) {
    return this.http.post<TipoDireccion>(this.Url + "/tipo-direccion/", tipoDireccion);
  }
  actualizarTipoDireccion(tipoDireccion: TipoDireccion) {
    return this.http.put<TipoDireccion>(this.Url + "/tipo-direccion/", tipoDireccion);
  }
  deshabilitarTipoDireccion(id: number) {
    return this.http.delete(this.Url + "/tipo-direccion/" + id);
  }
}
