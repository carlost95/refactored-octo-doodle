import {Injectable} from '@angular/core';
import {MovimientoArticuloDTO} from '../models/MovimientoArticuloDTO';
import {Response} from '../models/Response';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {movimientos} from '../../environments/global-route';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + movimientos.path;
  }

// tslint:disable-next-line: typedef
  guardarMovimientoPedido(movimientoArticuloDTO: MovimientoArticuloDTO) {
    return this.http.post<Response>(this.url + '/pedidos/', movimientoArticuloDTO);
  }

  // tslint:disable-next-line:typedef
  guardarMovimientoAjuste(movimientoArticuloDTO: MovimientoArticuloDTO) {
    return this.http.post<Response>(this.url + '/ajustes/', movimientoArticuloDTO);
  }

// tslint:disable-next-line: typedef
  getMovimientosPreviosPedidos(idPedido: number) {
    return this.http.get<Response>(this.url + '/pedido/' + idPedido);
  }

  // tslint:disable-next-line:typedef
  getMovimientosPreviosAjustes(idAjuste: number) {
    return this.http.get<Response>(this.url + '/ajuste/' + idAjuste);
  }

// tslint:disable-next-line: typedef
  getMovimientosStockPedido(idPedido: number) {
    return this.http.get<Response>(this.url + '/stock-pedido/' + idPedido);
  }

  // tslint:disable-next-line:typedef
  getMovimientosStockAjuste(idAjuste: number) {
    return this.http.get<Response>(this.url + '/stock-ajuste/' + idAjuste);
  }


  // tslint:disable-next-line:typedef
  listarStockArticuloPedido() {
    return this.http.get<Response>(this.url + '/stock-pedido');
  }

  // tslint:disable-next-line:typedef
  listarStockArticuloAjuste() {
    return this.http.get<Response>(this.url + '/stock-ajuste');
  }


}
