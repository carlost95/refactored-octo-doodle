import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubRubroDTO} from '../models/SubRubroDTO';
import {environment} from '../../environments/environment.prod';
import {rubro, subRubro} from '../../environments/global-route';
import {Response} from '../models/Response';
import {BehaviorSubject, combineLatest, forkJoin, Observable, of, Subject} from 'rxjs';
import {SubRubroRest} from '@models/subrubro-rest';
import {RubrosService} from '@service/rubros.service';
import {RubroRest} from '@models/rubro-rest';
import {concatMap, map, mergeMap, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubRubroService {
  private url: string;
  private rubroSubject$: BehaviorSubject<RubroRest[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient,
              private readonly rubroService: RubrosService) {
    this.url = environment.url + subRubro.path;
    this.rubroService.obtenerRubros().subscribe(data => this.rubroSubject$.next(data));
    this.rubroSubject$.asObservable();
  }

  obtenerRubros(): Observable<any> {
    return this.rubroSubject$;
  }

  obtenerSubRubros(): Observable<SubRubroRest[]> {
    return this.http.get<SubRubroRest[]>(this.url)
      .pipe(
        switchMap((subrubros) => forkJoin({
          rubros: this.rubroService.obtenerRubros(),
          subrubros: of(subrubros)
        })),
        map(({rubros, subrubros}) => subrubros.map(subrubro => ({
          ...subrubro,
          rubroNombre: rubros.find(rubro => rubro.idRubro === subrubro.rubroId).nombre
        }))));
  }

  actualizar(subrubro: SubRubroRest): Observable<SubRubroRest> {
    return this.http.put<SubRubroRest>(this.url, subrubro);
  }

  guardar(subrubro: SubRubroRest): Observable<SubRubroRest> {
    return this.http.post<SubRubroRest>(this.url, subrubro);
  }

  cambiarEstado(id: number): Observable<SubRubroRest> {
    return this.http.put<SubRubroRest>(this.url + '/' + id, id);
  }

  // tslint:disable-next-line: typedef
  listarSubRubrosTodos() {
    return this.http.get<Response>(this.url);
  }

  // tslint:disable-next-line: typedef
  listarSubRubrosHabilitados() {
    return this.http.get<Response>(this.url + '/habilitados');
  }

  // tslint:disable-next-line: typedef
  listarSubRubrosPorIdRubro(id: number) {
    return this.http.get<Response>(this.url + '/rubro/' + id);
  }

  // tslint:disable-next-line: typedef
  guardarSubRubro(subRubroDTO: SubRubroDTO) {
    return this.http.post<Response>(this.url, subRubroDTO);
  }

  // tslint:disable-next-line: typedef
  actualizarSubRubro(subRubroDTO: SubRubroDTO) {
    return this.http.put<Response>(this.url, subRubroDTO);
  }

  // tslint:disable-next-line: typedef
  listarSubRubroId(id: number) {
    return this.http.get<Response[]>(this.url + id);
  }

  // tslint:disable-next-line: typedef
  cambiarHabilitacion(id: number) {
    return this.http.put<Response>(this.url + '/' + id, id);
  }
}
