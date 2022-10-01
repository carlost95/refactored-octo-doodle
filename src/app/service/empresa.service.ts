import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { empresa } from 'environments/global-route';
import { Observable } from 'rxjs';
import { Empresa } from '../models/Empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + empresa.path;
  }
  getAllEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.url);
  }
  getEnabledEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.url + '/habilitadas');
  }
  getEmpresaById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(this.url + '/' + id);
  }
  saveEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.url, empresa);
  }
  updatedEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(this.url, empresa);
  }
  changeStatusEmpresa(id: number): Observable<Empresa> {
    return this.http.put<Empresa>(this.url + '/' + id, id);
  }
}
