import { MovimientoArticuloDTO } from './../modelo/MovimientoArticuloDTO';
import { Pedido } from './../modelo/Pedido';
import { ArticuloDTO } from './../modelo/ArticuloDTO';
import { Articulo } from './../modelo/Articulo';
import { Proveedor } from './../modelo/Proveedor';
import { Response } from './../modelo/Response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class ComprasService {
  // Url = "//localhost:8081";
  Url =environment.url;

  constructor(private http: HttpClient) {}

  listarProveedoresTodos() {
    return this.http.get<Response>(this.Url + "/proveedores");
  }
  listarProveedoresHabilitados() {
    return this.http.get<Response>(this.Url + "/proveedores/habilitados");
  }
  guardarProveedor(proveedor: Proveedor) {
    return this.http.post<Proveedor>(this.Url + "/proveedores/", proveedor);
  }

  // SERVICE TO ARTICULOS
  listarArticuloTodos() {
    return this.http.get<Response>(this.Url+ "/articulos");
  }
  listarArticuloHabilitados() {
    return this.http.get<Response>(this.Url+ "/articulos/habilitados");
  }
  guardarArticulo(articuloDTO: ArticuloDTO) {
    return this.http.post<ArticuloDTO>(this.Url + "/articulos/", articuloDTO);
  }
  actualizarArticulo(articuloDTO: ArticuloDTO) {
    return this.http.put<ArticuloDTO>(this.Url + "/articulos/", articuloDTO);
  }
  listarArticuloId(id: number) {
    return this.http.get<Response>(this.Url + "/articulos/" + id);
  }
  desabilitarArticulo(id: number) {
    return this.http.delete(this.Url + "/articulos/" + id);
  }
  listarStockArticulo() {
    return this.http.get<Response>(this.Url+ "/movimientos/stock");
  }
  // SERVICE THE PEDIDO
  listarPedidoTodos() {
    return this.http.get<Response>(this.Url+ "/pedidos");
  }
  listarPedidosHabilitados() {
    return this.http.get<Response>(this.Url+ "/pedidos/habilitados");
  }
  async guardarPedidos(pedido: Pedido) {
    let pedidos = await this.http.post<Response>(this.Url + "/pedidos/", pedido).toPromise();
    return pedidos;
  }
  actualizarPedido(pedido: Pedido) {
    return this.http.put<Pedido>(this.Url + "/pedidos/", pedido);
  }
  listarPedidoId(id: number) {
    return this.http.get<Response>(this.Url + "/pedidos/" + id);
  }
  desabilitarPedido(id: number) {
    return this.http.delete(this.Url + "/pedidos/" + id);
  }
// SERVICE MOVIMIENTO
guardarMovimiento(movimientoArticuloDTO: MovimientoArticuloDTO) {
  return this.http.post<Response>(this.Url + "/movimientos/", movimientoArticuloDTO);
}
getMovimientosPrevios(idPedido: number) {
    return this.http.get<Response>(this.Url + `/movimientos/${idPedido}`);
}
getMovimientosStock(idPedido: number){
    return this.http.get<Response>(this.Url + `/movimientos/stock/${idPedido}`);
}
}
