import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { reporte } from '../../environments/global-route';
import { Observable } from "rxjs";
import { Remito } from "../models/Remito";
import { ReporteFechas } from '../models/ReporteFechas';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + '/reportes';
  }


  getVentasPorMes(reporteFechas: ReporteFechas): Observable<any[]> {
    return this.http.post<any[]>(this.url + reporte.ventas, reporteFechas);
  }
  getRemitoPorMes(reporteFechas: ReporteFechas): Observable<any[]> {
    return this.http.post<any[]>(this.url + reporte.remitos, reporteFechas);
  }
  getPedidosPorMes(reporteFechas: ReporteFechas): Observable<any[]> {
    return this.http.post<any[]>(this.url + reporte.pedidos, reporteFechas);
  }
}
