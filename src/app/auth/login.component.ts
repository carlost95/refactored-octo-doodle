import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from '../models/login-usuario';
import { SnackConfirmComponent } from '../shared/snack-confirm/snack-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() pressLogin = new EventEmitter<boolean>();
  isLogged = false;
  isLoginsFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;
  viewPassword = true;

  constructor(private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,

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
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;
      this.pressLogin.emit(true);
      this.router.navigate(['']);
    },
      err => {
        this.isLogged = false;
        this.isLoginsFail = true;
        this.errMsj = err.error.message;
        // console.log(this.errMsj);
      });
  }
}
