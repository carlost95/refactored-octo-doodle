import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginUsuario} from '../models/login-usuario';
import {TokenService} from '../service/token.service';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {ResetPasswordUser} from '../models/ResetPasswordUser';
import {NewUsuario} from '../models/new-usuario';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @Output() pressLogin = new EventEmitter<boolean>();
  isLogged = false;
  isPasswordFail = false;
  user: NewUsuario;
  newUser: NewUsuario = new NewUsuario();
  nombreUsuario: string;
  passwordInicial: string;
  passwordRepet: string;
  roles: string[] = [];
  errMsj: string;
  sizeMin = false;
  sizeMax = false;
  errorNumber = false;
  errorLetraMin = false;
  errorLetraMay = false;
  viewPassword = true;
  viewPassRepete = true;

  constructor(private tokenService: TokenService,
              private authService: AuthService,
              private router: Router
  ) {
  }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isPasswordFail = false;
      this.roles = this.tokenService.getAuthorities();
      this.nombreUsuario = this.tokenService.getUserName();
    }
    await this.authService.listUserNombre(this.nombreUsuario).toPromise().then((data) =>
      this.user = data.data);
  }

  onResetPassword(): void {
    if (this.passwordInicial === this.passwordRepet) {
      this.isPasswordFail = false;
      this.updatePassword();
    } else {
      this.isPasswordFail = true;
      (this.errMsj = 'las contraseñas ingresadas no coinciden');
    }
  }

  updatePassword(): void {
    this.newUser.id = this.user.id;
    this.newUser.nombre = this.user.nombre;
    this.newUser.email = this.user.email;
    this.newUser.nombreUsuario = this.user.nombreUsuario;
    this.newUser.password = this.passwordInicial;
    this.authService.updateUser(this.newUser).subscribe(data =>
      this.newUser = data);
    this.onLogOut();
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
    this.router.navigate(['login']);
  }

  validarSize({target}): void {
    const {value: password} = target;
    if (password.length < 8) {
      this.sizeMin = true;
    } else {
      this.sizeMin = false;
    }
    if (password.length > 14) {
      this.sizeMax = true;
    } else {
      this.sizeMax = false;
    }
  }

  validarNumber({target}): void {
    const {value: password} = target;
    if (/\d/.test(password)) {
      this.errorNumber = false;
    } else {
      this.errorNumber = true;
    }
  }

  validarMinusculas({target}): void {
    const {value: password} = target;
    const ER = new RegExp('^(?=.*?[a-z])');
    if (ER.test(password)) {
      this.errorLetraMin = false;
    } else {
      this.errorLetraMin = true;
    }
  }

  validarMayusculas({target}): void {
    const {value: password} = target;
    const ER = new RegExp('^(?=.*?[A-Z])');
    if (ER.test(password)) {
      this.errorLetraMay = false;
    } else {
      this.errorLetraMay = true;
    }
  }

  back(): void {
    this.router.navigate(['']);
  }

}


