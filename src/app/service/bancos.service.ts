import { Injectable } from '@angular/core';
import {Response} from '../models/Response';
import {Banco} from '../models/Banco';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {banco} from '../../environments/global-route';
import {Observable} from 'rxjs';
import {BancoRest} from '@models/banco-rest';

@Injectable({
  providedIn: 'root'
})
export class BancosService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + banco.path;

  }

  obtenerBancos(): Observable<BancoRest[]>{
    return this.http.get<BancoRest[]>(this.url);
  }

  listarBancosTodos() {
    return this.http.get<Response>(this.url);
  }
  guardarBanco(banco: Banco) {
    return this.http.post<Response>(this.url , banco);
  }
  actualizarBanco(banco: Banco) {
    return this.http.put<Response>(this.url , banco);
  }
  cambiarHabilitacion(id: number) {
    return this.http.put<Response>(this.url + '/' + id , id);
  }
  listarBancoId(id: number) {
    return this.http.get<Response>(this.url + '/' + id);
  }

  obtenerHabilitados(): Observable<BancoRest[]>{
    return this.http.get<BancoRest[]>(this.url + '/habilitados');
  }
}
