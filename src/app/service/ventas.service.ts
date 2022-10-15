import { Venta } from './../models/Venta';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { ventas } from '../../environments/global-route';
import { Observable } from 'rxjs';
import { VentaConsult } from '../models/Venta';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + ventas.path;
  }

  getSales(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.url);
  }

  getSaleById(id: number): Observable<VentaConsult> {
    return this.http.get<VentaConsult>(`${this.url}/${id}`);
  }

  saveSale(venta: Venta): Observable<Venta> {
    return this.http.post<Venta>(this.url, venta);
  }
}
