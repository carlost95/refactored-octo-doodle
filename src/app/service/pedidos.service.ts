import { Pedido } from '@models/pedido';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { pedidos } from '../../environments/global-route';
import { Observable } from 'rxjs';

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
}
