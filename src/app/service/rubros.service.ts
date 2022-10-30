import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { rubro } from '../../environments/global-route';
import { Observable } from 'rxjs';
import { RubroRest } from '@models/rubro-rest';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + rubro.path;
  }

  obtenerRubros(): Observable<RubroRest[]> {
    return this.http.get<RubroRest[]>(this.url);
  }

  obtenerHabilitados(): Observable<RubroRest[]> {
    return this.http.get<RubroRest[]>(this.url + '/habilitados');
  }

  cambiarEstado(id: number): Observable<RubroRest> {
    return this.http.put<RubroRest>(this.url + '/' + id, id);
  }

  // tslint:disable-next-line:no-shadowed-variable
  guardar(rubro: RubroRest): Observable<RubroRest> {
    return this.http.post<RubroRest>(this.url, rubro);
  }

  // tslint:disable-next-line:no-shadowed-variable
  actualizar(rubro: RubroRest): Observable<RubroRest> {
    return this.http.put<RubroRest>(this.url, rubro);
  }
}
