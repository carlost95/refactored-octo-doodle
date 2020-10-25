import {ArticuloDTO} from './../modelo/ArticuloDTO';
import {Response} from './../modelo/Response';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {articulos, subRubro} from '../../environments/global-route';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  // Url = "//localhost:8081";
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + articulos.path;
  }

  // tslint:disable-next-line:typedef
  listarArticuloTodos() {
    return this.http.get<Response>(this.url);
  }

  // tslint:disable-next-line:typedef
  listarArticuloHabilitados() {
    return this.http.get<Response>(this.url + '/habilitados');
  }

  // tslint:disable-next-line:typedef
  guardarArticulo(articuloDTO: ArticuloDTO) {
    return this.http.post<Response>(this.url, articuloDTO);
  }

  // tslint:disable-next-line:typedef
  actualizarArticulo(articuloDTO: ArticuloDTO) {
    return this.http.put<Response>(this.url + '/', articuloDTO);
  }

  // tslint:disable-next-line:typedef
  listarArticuloId(id: number) {
    return this.http.get<Response>(this.url + id);
  }

  // tslint:disable-next-line:typedef
  desabilitarArticulo(id: number) {
    return this.http.delete(this.url + id);
  }

  // tslint:disable-next-line:typedef
  cambiarHabilitacion(id: number) {
    return this.http.put<Response>(this.url + '/' + id, id);
  }
}
