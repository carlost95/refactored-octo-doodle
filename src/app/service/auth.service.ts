import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewUsuario} from '../models/new-usuario';
import {Observable} from 'rxjs';
import {LoginUsuario} from '../models/login-usuario';
import {JwtDTO} from '../models/jwt-dto';
import {auth} from '../../environments/global-route';
import {environment} from '../../environments/environment.prod';
import {Response} from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url + auth.path;
  }

  // tslint:disable-next-line:typedef
  public listUsers() {
    return this.http.get<Response>(this.url);
  }

  public nuevo(newUsuario: NewUsuario): Observable<any> {
    return this.http.post<any>(this.url + '/nuevo', newUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(this.url + '/login', loginUsuario);
  }
}
