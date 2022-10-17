import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { remito } from '../../environments/global-route';

import { Observable } from 'rxjs';
import { Remito, RemitoConsult } from '../models/Remito';

@Injectable({
  providedIn: 'root'
})
export class RemitoService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + remito.path;
  }

  getAllRemitos(): Observable<Remito[]> {
    return this.http.get<Remito[]>(this.url);
  }
  getRemitoEntregados(): Observable<Remito[]> {
    return this.http.get<Remito[]>(`${this.url}/entregados`);
  }
  getRemitosNoEntregados(): Observable<Remito[]> {
    return this.http.get<Remito[]>(`${this.url}/no-entregados`);
  }
  getSaleById(id: number): Observable<RemitoConsult> {
    return this.http.get<RemitoConsult>(`${this.url}/${id}`);
  }
  changeStatusRemito(remito: RemitoConsult): Observable<Remito> {
    return this.http.put<Remito>(`${this.url}/${remito.idRemito}`, remito);
  }

}
