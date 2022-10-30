import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { marca } from '../../environments/global-route';
import { Observable } from 'rxjs';
import { MarcaRest } from '@models/marca-rest';
import { map } from "rxjs/operators";

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

  obtenerMarcasHabilitadas(): Observable<MarcaRest[]> {
    return this.http.get<MarcaRest[]>(this.url)
      .pipe(
        map(marcas => marcas.filter(marca => marca.habilitado))
      );
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

}
