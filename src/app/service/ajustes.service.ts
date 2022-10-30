import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { ajuste } from '../../environments/global-route';
import { Ajuste, AjusteDTO } from '../models/Ajuste';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjustesService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + ajuste.path;
  }

  getAllAjustes(): Observable<Ajuste[]> {
    return this.http.get<Ajuste[]>(this.url);
  }

  getAjusteById(id): Observable<AjusteDTO> {
    return this.http.get<AjusteDTO>(`${this.url}/${id}`);
  }
  saveAjuste(ajuste: AjusteDTO): Observable<AjusteDTO> {
    return this.http.post<AjusteDTO>(this.url, ajuste);
  }
}
