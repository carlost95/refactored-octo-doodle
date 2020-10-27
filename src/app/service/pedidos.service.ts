import {Pedido} from '../models/Pedido';
import {Response} from '../models/Response';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {pedidos} from '../../environments/global-route';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  // Url = "//localhost:8081";
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + pedidos.path;
  }

  // SERVICE THE PEDIDO
  // tslint:disable-next-line:typedef
  listarPedidoTodos() {
    return this.http.get<Response>(this.url);
  }

  // tslint:disable-next-line: typedef
  async guardarPedidos(pedido: Pedido) {
    // tslint:disable-next-line:no-shadowed-variable
    const pedidos = await this.http.post<Response>(this.url, pedido).toPromise();
    return pedidos;
  }

  // tslint:disable-next-line:typedef
  listarPedidoId(id: number) {
    return this.http.get<Response>(this.url + '/' + id);
  }
}
