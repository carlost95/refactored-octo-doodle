import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {ventas} from '../../environments/global-route';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + ventas.path;
  }


}
