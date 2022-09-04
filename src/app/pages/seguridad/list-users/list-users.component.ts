import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AgregarArticuloComponent} from '../../compras/articulos/agregar-articulo/agregar-articulo.component';
import {NewUsuario} from '../../../models/new-usuario';
import {RegisterComponent} from '../register/register.component';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  usersFilter: NewUsuario[] = [];
  users: NewUsuario [] = [];
  busqueda: any;
  toUpdateUser: NewUsuario;
  consultingUser: boolean;

  constructor(
    public matDialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
  }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    await this.authService.listUsers().toPromise().then((data) => {
      console.log(data.data);
      this.users = data.data;
      this.usersFilter = this.users;
    });
  }

  consultUser(user: NewUsuario): void {
    this.toUpdateUser = user;
    this.consultingUser = true;
    this.openDialog();
  }

  modifyUser(user: NewUsuario): void {
    this.toUpdateUser = user;
    this.consultingUser = false;
    this.openDialog();
  }

  newUser(): void {
    this.toUpdateUser = null;
    this.consultingUser = false;
    this.openDialog();
  }

  filtrarUser(): void {
    this.busqueda = this.busqueda.toLowerCase();
    this.usersFilter = this.users;

    if (this.busqueda !== null) {

      this.usersFilter = this.users.filter((item) => {
        const inName = item.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
        const inLastName = item.nombreUsuario.toLowerCase().indexOf(this.busqueda) !== -1;
        const inEmail =
          item.email.toLowerCase().indexOf(this.busqueda) !== -1;
        return inName || inLastName || inEmail;

      });
    }

  }

  backPage(): void {
    this.router.navigate(['/seguridad']);
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '600px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      user: this.toUpdateUser,
      consulting: this.consultingUser
    };
    const modalDialog = this.matDialog.open(RegisterComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.authService.listUsers().subscribe(data => {
        this.users = data.data;
        this.usersFilter = data.data;
      });
    });
  }
}
