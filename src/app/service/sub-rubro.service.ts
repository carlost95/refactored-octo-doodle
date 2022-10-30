import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { subRubro } from '../../environments/global-route';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { SubRubroRest } from '@models/subrubro-rest';
import { RubrosService } from '@service/rubros.service';
import { RubroRest } from '@models/rubro-rest';
import { map, switchMap } from 'rxjs/operators';

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
        map(({ rubros, subrubros }) => subrubros.map(subrubro => ({
          ...subrubro,
          rubroNombre: rubros.find(rubro => rubro.idRubro === subrubro.rubroId).nombre
        }))));
  }

  obtenerHabilitados(): Observable<SubRubroRest[]> {
    return this.http.get<SubRubroRest[]>(`${this.url}`)
      .pipe(
        map(subrubros => subrubros.filter(subrubro => subrubro.habilitado))
      );
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
}
