import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { unidadMedida } from '../../environments/global-route';
import { Observable } from 'rxjs';
import { UnidadMedidaRest } from '@models/unidad-medida-rest';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.url + unidadMedida.path;
  }

  obtenerUnidadesMedida(): Observable<UnidadMedidaRest[]> {
    return this.http.get<UnidadMedidaRest[]>(this.url);
  }
  obtenerUnidadesMedidaHabilitadas(): Observable<UnidadMedidaRest[]> {
    return this.http.get<UnidadMedidaRest[]>(this.url + '/habilitados');
  }
  cambiarEstado(id: number): Observable<UnidadMedidaRest> {
    return this.http.put<UnidadMedidaRest>(this.url + '/' + id, id);
  }

  guardar(unidadDeMedida: UnidadMedidaRest): Observable<UnidadMedidaRest> {
    return this.http.post<UnidadMedidaRest>(this.url, unidadDeMedida);
  }

  actualizar(unidadDeMedida: UnidadMedidaRest): Observable<UnidadMedidaRest> {
    console.log(this.url);
    return this.http.put<UnidadMedidaRest>(this.url, unidadDeMedida);
  }
}
