import { Injectable } from '@angular/core';
import { Response } from '../models/Response';
import { Banco } from '../models/Banco';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { banco } from '../../environments/global-route';
import { Observable } from 'rxjs';
import { BancoRest } from '@models/banco-rest';

@Injectable({
  providedIn: 'root'
})
export class BancosService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + banco.path;

  }

  obtenerBancos(): Observable<BancoRest[]> {
    return this.http.get<BancoRest[]>(this.url);
  }

  // tslint:disable-next-line:no-shadowed-variable
  guardar(banco: BancoRest): Observable<BancoRest> {
    return this.http.post<BancoRest>(this.url, banco);
  }

  // tslint:disable-next-line:no-shadowed-variable
  actualizar(banco: BancoRest): Observable<BancoRest> {
    return this.http.put<BancoRest>(this.url, banco);
  }

  actualizarEstado(id: number): Observable<BancoRest> {
    return this.http.put<BancoRest>(this.url + '/' + id, id);
  }

  obtenerHabilitados(): Observable<BancoRest[]> {
    return this.http.get<BancoRest[]>(this.url + '/habilitados');
  }
}
