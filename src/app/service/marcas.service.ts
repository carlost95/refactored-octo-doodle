import {Injectable} from '@angular/core';
import {Response} from '../models/Response';
import {Marca} from '../models/Marca';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {marca} from '../../environments/global-route';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  Url: string;

  constructor(private http: HttpClient) {
    this.Url = environment.url + marca.path;
  }

  listarMarcaTodos(): Observable<Response> {
    return this.http.get<Response>(this.Url);
  }

  listarMarcaHabilitados(): Observable<Response> {
    return this.http.get<Response>(this.Url + '/habilitados');
  }

  cambiarHabilitacion(id: number): Observable<Response> {
    return this.http.put<Response>(this.Url + '/' + id, id);
  }

  guardarMarca(marca: Marca): Observable<Response> {
    return this.http.post<Response>(this.Url + '/', marca);
  }

  actualizarMarca(marca: Marca): Observable<Response> {
    return this.http.put<Response>(this.Url, marca);
  }

  listarMarcaId(id: number): Observable<Response> {
    return this.http.get<Response>(this.Url + id);
  }

}
