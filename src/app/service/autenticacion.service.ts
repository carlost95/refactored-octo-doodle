import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import {environment} from "../../environments/environment.prod";

export class User {
  constructor(public status: string) {}
}

export class JwtResponse {
  constructor(public jwttoken: string) {}
}

@Injectable({
  providedIn: "root"
})
export class AutenticacionService {
  Url = environment.url;
  constructor(private httpClient: HttpClient) {}

  autenticacion(username, password) {
    return this.httpClient.post<any>(`${this.Url}/authenticate`,{username,password}).pipe(
      // return this.httpClient.post<any>('http://localhost:8081/authenticate',{username,password}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',username);
        let tokenStr= 'Bearer '+userData.token;
        sessionStorage.setItem('token', tokenStr);
        return userData;
       }
     )

    );
  }

  usuarioLogeado() {
    let usuario = sessionStorage.getItem("username");
    return !(usuario === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
  }
}
