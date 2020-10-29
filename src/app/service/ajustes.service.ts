import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {ajuste} from '../../environments/global-route';
import {Response} from '../models/Response';
import {Ajuste} from '../models/Ajuste';

@Injectable({
  providedIn: 'root'
})
export class AjustesService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + ajuste.path;
  }

  // SERVICE THE PEDIDO
  // tslint:disable-next-line: typedef
  listarAjusteTodos() {
    return this.http.get<Response>(this.url);
  }

  // tslint:disable-next-line: typedef
  listarAjustesHabilitados() {
    return this.http.get<Response>(this.url + '/habilitados');
  }

  // tslint:disable-next-line: typedef
  async guardarAjuste(ajuste: Ajuste) {
    const ajustes = await this.http.post<Response>(this.url, ajuste).toPromise();
    return ajustes;
  }

  // tslint:disable-next-line: typedef
  actualizarAjuste(ajuste: Ajuste) {
    return this.http.put<Ajuste>(this.url, ajuste);
  }

  // tslint:disable-next-line: typedef
  listarAjusteId(id: number) {
    return this.http.get<Response>(this.url + '/' + id);
  }

  // tslint:disable-next-line: typedef
  desabilitarAjuste(id: number) {
    return this.http.delete(this.url + id);
  }
}
