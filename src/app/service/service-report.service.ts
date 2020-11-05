import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {Response} from '../models/Response';
import {report} from '../../environments/global-route';

@Injectable({
  providedIn: 'root'
})
export class ServiceReportService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + report.path;
  }

  // tslint:disable-next-line: typedef
  getReporteBancoPdf() {
    // return this.http.get<Response>(this.Url + '/reportes/banco');
    return this.http.get<Response>(this.url + '/banco');
  }

  // tslint:disable-next-line: typedef
  getReporteArticuloPdf() {
    return this.http.get<Response>(this.url + '/articulo');
  }

  // tslint:disable-next-line: typedef
  getReporteMarcaPdf() {
    return this.http.get<Response>(this.url + '/marca');
  }

  // tslint:disable-next-line: typedef
  getReporteProveedorPdf() {
    return this.http.get<Response>(this.url + '/proveedor');
  }

  // tslint:disable-next-line: typedef
  getReporteRubroPdf() {
    return this.http.get<Response>(this.url + '/rubro');
  }

  // tslint:disable-next-line: typedef
  getReporteUnidadMedidaPdf() {
    return this.http.get<Response>(this.url + '/unidad-medida');
  }

  // tslint:disable-next-line: typedef
  getReporteSubRubroPdf() {
    return this.http.get<Response>(this.url + '/sub-rubro');
  }
}
