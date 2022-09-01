import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { cuentaBancario } from '../../environments/global-route';
import { Cuenta } from '../models/Cuenta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CuentaService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = environment.url + cuentaBancario.path;
  }
  getAccountBankById(id: number): Observable<Cuenta> {
    return this.http.get<Cuenta>(this.url + '/' + id);
  }
  getAccountBankByIdProveedor(id: number): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(this.url + '/proveedor/' + id);
  }
  saveAccountbBank(cuenta: Cuenta): Observable<Cuenta> {
    return this.http.post<Cuenta>(this.url, cuenta);
  }
  updateAccountBank(cuenta: Cuenta): Observable<Cuenta> {
    return this.http.put<Cuenta>(this.url, cuenta);
  }
  changeStatusAccountBank(id: number): Observable<Cuenta> {
    return this.http.put<Cuenta>(this.url + '/' + id, id);
  }
}
