import {Component, OnInit} from '@angular/core';
import {TokenService} from '../service/token.service';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {LoginUsuario} from '../models/login-usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginsFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;

  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginsFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(data => {
        this.isLogged = true;
        this.isLoginsFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuaario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
      },
      err => {
        this.isLogged = false;
        this.isLoginsFail = true;
        this.errMsj = err.error.mesaje;
        console.log(this.errMsj);
      });
  }
}
