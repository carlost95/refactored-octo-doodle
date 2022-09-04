import {ArticuloDTO} from '../models/ArticuloDTO';
import {Response} from '../models/Response';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {articulos, subRubro} from '../../environments/global-route';
import {ArticuloRest} from "@models/articulo-rest";
import {forkJoin, Observable, of} from "rxjs";
import {SubRubroRest} from "@models/subrubro-rest";
import {map, switchMap} from "rxjs/operators";
import {UnidadMedidaService} from "@service/unidad-medida.service";
import {RubrosService} from "@service/rubros.service";

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

  obtenerArticulos(): Observable<ArticuloRest[]>{
    return this.http.get<ArticuloRest[]>(this.url)
      .pipe(
        // tslint:disable-next-line:no-shadowed-variable
        switchMap((articulos) => forkJoin({
          articulos: of(articulos),
          unidadesMedida: this.unidadMedidaService.obtenerUnidadesMedida(),
          rubros: this.rubroService.obtenerRubros()
        })),
        // tslint:disable-next-line:no-shadowed-variable
        map(({articulos, unidadesMedida, rubros}) => articulos.map(articulo => ({
          ...articulo,
          unidadMedidaNombre: unidadesMedida.find(unidadMedida => unidadMedida.idUnidadMedida === articulo.idUnidadMedida).nombre,
          rubroNombre: rubros.find(rubro => rubro.idRubro === articulo.idRubro).nombre
        }))));
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
