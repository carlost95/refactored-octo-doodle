import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { cliente } from '../../environments/global-route';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + cliente.path;
  }

  getAllClient(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }
  getAllEnabledClient(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url + '/enabled');
  }

  saveClient(client: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, client);
  }

  updatedClient(client: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(this.url, client);
  }

  changeStatusClient(id: number): Observable<Cliente> {
    return this.http.put<Cliente>(this.url + '/' + id, id);
  }
}
