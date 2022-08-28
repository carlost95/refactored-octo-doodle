import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { cuenta } from '../../environments/global-route';
import { Response } from '../models/Response';
import { Cuenta } from '../models/Cuenta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CuentaService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = environment.url + cuenta.path;
  }
  getAllAccount(): Observable<Response> {
    return this.http.get<Response>(this.url);
  }
  saveAccount(): Observable<Response> {
    return this.http.post<Response>(this.url, cuenta);
  }
  updateAccount(): Observable<Response> {
    return this.http.put<Response>(this.url, cuenta);
  }
  changeStatusAccount(): Observable<Response> {
    return this.http.put<Response>(this.url + cuenta.status + `/${id}`, null);
  }
}
