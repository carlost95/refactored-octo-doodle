import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {reporte} from '../../environments/global-route';
import {Observable} from "rxjs";
import {Remito} from "../models/Remito";

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + '/reportes' + reporte.ventaPorMes;
  }

  obtenerVentasPorMes(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }
}

