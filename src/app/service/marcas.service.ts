import {Injectable} from '@angular/core';
import {Response} from '../models/Response';
import {Marca} from '../models/Marca';
import {environment} from '../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {marca} from '../../environments/global-route';
import {Observable} from 'rxjs';
import {MarcaRest} from '@models/marca-rest';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + marca.path;
  }

  obtenerMarcas(): Observable<MarcaRest[]> {
    return this.http.get<MarcaRest[]>(this.url);
  }

  cambiarEstado(id: number): Observable<MarcaRest> {
    return this.http.put<MarcaRest>(this.url + '/' + id, id);
  }

  // tslint:disable-next-line:no-shadowed-variable
  guardar(marca: MarcaRest): Observable<MarcaRest> {
    return this.http.post<MarcaRest>(this.url + '/', marca);
  }

  // tslint:disable-next-line:no-shadowed-variable
  actualizar(marca: MarcaRest): Observable<MarcaRest> {
    return this.http.put<MarcaRest>(this.url, marca);
  }

  listarMarcaTodos(): Observable<Response> {
    return this.http.get<Response>(this.url);
  }

  listarMarcaHabilitados(): Observable<Response> {
    return this.http.get<Response>(this.url + '/habilitados');
  }

  cambiarHabilitacion(id: number): Observable<Response> {
    return this.http.put<Response>(this.url + '/' + id, id);
  }

  guardarMarca(marca: Marca): Observable<Response> {
    return this.http.post<Response>(this.url + '/', marca);
  }

  actualizarMarca(marca: Marca): Observable<Response> {
    return this.http.put<Response>(this.url, marca);
  }

  listarMarcaId(id: number): Observable<Response> {
    return this.http.get<Response>(this.url + id);
  }



}
