import { ArticuloDTO } from '../models/ArticuloDTO';
import { Response } from '../models/Response';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { articulos, subRubro } from '../../environments/global-route';
import { ArticuloRest, ArticuloStock } from '@models/articulo-rest';
import { forkJoin, Observable, of } from 'rxjs';
import { SubRubroRest } from '@models/subrubro-rest';
import { map, switchMap } from 'rxjs/operators';
import { UnidadMedidaService } from '@service/unidad-medida.service';
import { RubrosService } from '@service/rubros.service';
import { Articulo } from '@models/Articulo';
import { Proveedor } from "@models/Proveedor";

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
  // Url = "//localhost:8081";
  private url: string;

  constructor(private http: HttpClient,
    private readonly unidadMedidaService: UnidadMedidaService,
    private readonly rubroService: RubrosService) {
    this.url = environment.url + articulos.path;
  }

  obtenerArticulos(): Observable<ArticuloRest[]> {
    return this.http.get<ArticuloRest[]>(this.url)
      .pipe(
        // tslint:disable-next-line:no-shadowed-variable
        switchMap((articulos) => forkJoin({
          articulos: of(articulos),
          unidadesMedida: this.unidadMedidaService.obtenerUnidadesMedida(),
          rubros: this.rubroService.obtenerRubros()
        })),
        // tslint:disable-next-line:no-shadowed-variable
        map(({ articulos, unidadesMedida, rubros }) => articulos.map(articulo => ({
          ...articulo,
          unidadMedidaNombre: unidadesMedida.find(unidadMedida => unidadMedida.idUnidadMedida === articulo.idUnidadMedida).nombre,
          rubroNombre: rubros.find(rubro => rubro.idRubro === articulo.idRubro).nombre
        }))));
  }

  obtenerArticuloByProveedor(id: string): Observable<ArticuloStock[]> {
    return this.http.get<ArticuloStock[]>(`${this.url}/proveedor/${id}`);
  }

  guardar(articulo: ArticuloRest): Observable<ArticuloRest> {
    return this.http.post<ArticuloRest>(this.url, articulo);
  }

  actualizar(articulo: ArticuloRest): Observable<ArticuloRest> {
    return this.http.put<ArticuloRest>(this.url, articulo);
  }

  cambiarEstado(id: number): Observable<ArticuloRest> {
    return this.http.put<ArticuloRest>(this.url + '/' + id, id);
  }

  // tslint:disable-next-line:typedef
  listarArticuloHabilitados() {
    return this.http.get<Response>(this.url + '/habilitados');
  }

  obtenerArticuloPorProveedor(proveedorId: number): Observable<ArticuloRest[]> {
    return this.http.get<ArticuloStock[]>(`${this.url}/proveedor/${proveedorId}`)
      .pipe(map(articulos => articulos.map(articulo => ({ ...articulo, stockFinal: articulo.stockActual, cantidad: 0 }))));
  }
}
