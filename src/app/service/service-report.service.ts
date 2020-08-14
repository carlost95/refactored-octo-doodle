import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Response } from '../modelo/Response';

@Injectable({
  providedIn: 'root'
})
export class ServiceReportService {

  Url = environment.url;

  constructor(private http: HttpClient) { }

  getReporteBancoPdf() {
    return this.http.get<Response>(this.Url + '/reportes/banco');
  }

  // tslint:disable-next-line: typedef
  getReporteArticuloPdf() {
    return this.http.get<Response>(`${this.Url}/reportes/articulo`);
  }
}
