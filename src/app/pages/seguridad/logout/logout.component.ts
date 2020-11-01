import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {TokenService} from '../../../service/token.service';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewUsuario} from '../../../models/new-usuario';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  @Output() pressLogin = new EventEmitter<boolean>();
  isLogout = false;
  isLogoutFail = false;
  newUsuario: NewUsuario = new NewUsuario();
  errMsj: string;
  isLogged: boolean;

  userForm: FormGroup;
  users: NewUsuario[] = [];
  errorInForm = false;
  submitted = false;
  updating = false;
  consulting: boolean;
  rolSelect: string;
  roles: string[] = ['ADMIN', 'USER'];


  // nombreRepe: boolean;

  constructor(private formBuilder: FormBuilder,
              private tokenService: TokenService,
              private authService: AuthService,
              private router: Router,
              public dialogRef: MatDialogRef<LogoutComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    const {user} = this.data;
    if (user) {
      this.consulting = this.data.consulting;
      this.userForm = this.formBuilder.group({
        nombre: [{value: user.nombre, disabled: this.consulting}, Validators.required],
        email: [{value: user.email, disabled: this.consulting}, Validators.required],
        nombreUsuario: [{value: user.nombreUsuario, disabled: this.consulting}, Validators.required],
        password: [{value: user.password, disabled: this.consulting}, Validators.required],
        roles: [{value: user.roles, disabled: this.consulting}, Validators.required]
      });
      this.updating = !this.consulting;
    } else {
      this.userForm = this.formBuilder.group({
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

    if (this.errorInForm) {
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
    this.newUsuario.nombre = (this.userForm.controls.nombre.value).trim();
    this.newUsuario.email = (this.userForm.controls.email.value).trim();
    this.newUsuario.nombreUsuario = (this.userForm.controls.nombreUsuario.value).trim();
    this.newUsuario.password = (this.userForm.controls.password.value).trim();
    if ((this.userForm.controls.roles.value).toLowerCase() !== 'admin') {
      this.newUsuario.roles.push('user');
    } else {
      this.newUsuario.roles.push('admin');
    }

    console.log('usuario nuevo');
    console.warn(this.newUsuario);

    if (this.updating) {
      this.update();
    } else {
      this.onLogout();
      // this.save();
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
  private update() {
    this.authService.updateUser(this.newUsuario).subscribe(data => {
      this.newUsuario = data.data;
      this.dialogRef.close();
    });
  }

  // tslint:disable-next-line:typedef
  private save() {

  }
}
