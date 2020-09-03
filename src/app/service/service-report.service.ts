import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Response } from '../modelo/Response';
import { report } from '../../environments/global-route';

@Injectable({
  providedIn: 'root'
})
export class ServiceReportService {

  Url = environment.url;

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getReporteBancoPdf() {
    // return this.http.get<Response>(this.Url + '/reportes/banco');
    return this.http.get<Response>(this.Url + report.path + '/banco');
  }

  // tslint:disable-next-line: typedef
  getReporteArticuloPdf() {
    return this.http.get<Response>(this.Url + report.path + '/articulo');
  }
  // tslint:disable-next-line: typedef
  getReporteMarcaPdf() {
    return this.http.get<Response>(this.Url + report.path + '/marca');
  }
  // tslint:disable-next-line: typedef
  getReporteProveedorPdf() {
    return this.http.get<Response>(this.Url + report.path + '/proveedor');
  }
}
