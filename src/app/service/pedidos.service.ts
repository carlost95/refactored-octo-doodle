import {Pedido} from '@models/pedido';
import {Response} from '../models/Response';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {pedidos} from '../../environments/global-route';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + pedidos.path;
  }


  obtenerPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.url);
  }

  obtenerPedido(id): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.url}/${id}`);
  }

  guardar(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.url, pedido);
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
