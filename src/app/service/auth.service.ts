import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewUsuario} from '../models/new-usuario';
import {Observable} from 'rxjs';
import {LoginUsuario} from '../models/login-usuario';
import {JwtDTO} from '../models/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8081/auth/';

  constructor(private httpClient: HttpClient) {
  }

  public nuevo(newUsuario: NewUsuario): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', newUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO> {
    return this.httpClient.post<JwtDTO>(this.authURL + 'login', loginUsuario);
  }
}
