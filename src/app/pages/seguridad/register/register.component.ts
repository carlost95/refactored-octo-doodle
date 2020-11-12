import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {TokenService} from '../../../service/token.service';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewUsuario} from '../../../models/new-usuario';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() pressLogin = new EventEmitter<boolean>();
  isLogout = false;
  isLogoutFail = false;
  newUsuario: NewUsuario = new NewUsuario();
  errMsj: string;
  isLogged: boolean;

  userForm: any;
  users: NewUsuario[] = [];
  errorInForm = false;
  submitted = false;
  updating = false;
  consulting: boolean;
  rolSelect = null;
  roles: string[] = ['ADMIN', 'USER', 'GERENTE'];

  userNameRepe = false;
  emailRepe = false;
  passwordError = false;

  constructor(private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private authService: AuthService,
              private router: Router,
              public dialogRef: MatDialogRef<RegisterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit(): void {
    this.authService.listUsers().subscribe(data => {
      this.users = data.data;
    });

    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    const {user} = this.data;
    if (user) {
      if (user.roles.find(x => x.rolNombre === 'ROLE_GERENTE')) {
        this.rolSelect = 'GERENTE';
        console.log(this.rolSelect);
      } else if (user.roles.find(x => x.rolNombre === 'ROLE_ADMIN')) {
        this.rolSelect = 'ADMIN';
      } else {
        this.rolSelect = 'USER';
        console.log(this.rolSelect);

      }
      this.consulting = this.data.consulting;
      this.userForm = this.formBuilder.group({
        id: [user.id, null],
        nombre: [{value: user.nombre, disabled: this.consulting}, Validators.required],
        email: [{value: user.email, disabled: this.consulting}, Validators.required],
        nombreUsuario: [{value: user.nombreUsuario, disabled: this.consulting}, Validators.required],
        password: [{value: user.password, disabled: this.consulting}, Validators.required],
        roles: [{value: user.roles, disabled: this.consulting}, Validators.required]
      });
      this.updating = !this.consulting;
    } else {
      this.userForm = this.formBuilder.group({
        id: ['', null],
        nombre: ['', Validators.required],
        email: ['', Validators.required],
        nombreUsuario: ['', Validators.required],
        password: ['', Validators.required],
        roles: ['', Validators.required]
      });
    }
  }


// tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    this.errorInForm = this.submitted && this.userForm.invalid;

    if (this.errorInForm || this.userNameRepe || this.emailRepe) {
      this.userForm.controls.nombre.markAsTouched();
      this.userForm.controls.email.markAsTouched();
      this.userForm.controls.nombreUsuario.markAsTouched();
      this.userForm.controls.password.markAsTouched();
      this.userForm.controls.roles.markAsTouched();
      console.log('Error en validacion de datos');
    } else {
      this.makeDTO();

    }
  }

  // tslint:disable-next-line:typedef
  makeDTO() {
    this.newUsuario.id = (this.userForm.controls.id.value);
    this.newUsuario.nombre = (this.userForm.controls.nombre.value).trim();
    this.newUsuario.email = (this.userForm.controls.email.value).trim();
    this.newUsuario.nombreUsuario = (this.userForm.controls.nombreUsuario.value).trim();
    this.newUsuario.password = (this.userForm.controls.password.value).trim();
    if ((this.userForm.controls.roles.value).toLowerCase() !== 'admin' &&
      (this.userForm.controls.roles.value).toLowerCase() !== 'gerente') {
      this.newUsuario.roles.push('user');
    } else if ((this.userForm.controls.roles.value).toLowerCase() === 'admin') {
      this.newUsuario.roles.push('admin');
    } else {
      this.newUsuario.roles.push('gerente');
    }

    if (this.updating) {
      this.update();
    } else {
      console.log(this.newUsuario.roles);
      this.onLogout();
    }

  }

  // tslint:disable-next-line:typedef
  async onLogout() {
    await this.authService.nuevo(this.newUsuario).toPromise().then((data) => {
        this.newUsuario = data;
        this.isLogout = true;
        this.isLogoutFail = false;
      },
      err => {
        this.isLogout = false;
        this.isLogoutFail = true;
        this.errMsj = err.error.mensaje;
        console.log(this.errMsj);
      });
    if (this.isLogout) {
      this.dialogRef.close();
    }
  }

// tslint:disable-next-line:typedef
  close() {
    this.dialogRef.close();
  }

  // tslint:disable-next-line:typedef
  async update() {
    console.log(this.newUsuario);
    console.log(this.newUsuario.roles);
    await this.authService.updateUser(this.newUsuario).toPromise().then((data) => {
        this.newUsuario = data;
        this.isLogout = true;
        this.isLogoutFail = false;
      },
      err => {
        this.isLogout = false;
        this.isLogoutFail = true;
        this.errMsj = err.error.mensaje;
        console.log(this.errMsj);
      });
    if (this.isLogout) {
      this.dialogRef.close();
    }
  }

  // tslint:disable-next-line:typedef
  validarNombreUsuario({target}) {
    const {value: nombre} = target;
    const finded = this.users.find(p => p.nombreUsuario.toLowerCase() === nombre.toLowerCase());
    console.log('nombre usuarios');
    this.userNameRepe = (finded !== undefined) ? true : false;
  }

  // tslint:disable-next-line:typedef
  validarEmail({target}) {
    const {value: nombre} = target;
    const finded = this.users.find(p => p.email.toLowerCase() === nombre.toLowerCase());
    console.log('emails');

    this.emailRepe = (finded !== undefined) ? true : false;
  }

  // tslint:disable-next-line:typedef
  validarPassword({target}) {
    const {value: password} = target;
    console.log(password);
    if (password.length < 8 || password.length > 14) {
      this.passwordError = true;
    } else {
      this.passwordError = false;
    }

  }
}
