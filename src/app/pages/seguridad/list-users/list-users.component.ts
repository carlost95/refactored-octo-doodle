import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AgregarArticuloComponent} from '../../compras/agregar-articulo/agregar-articulo.component';
import {NewUsuario} from '../../../models/new-usuario';
import {LogoutComponent} from '../logout/logout.component';
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
  consultingUser: false;

  constructor(
    public matDialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {
  }

  // tslint:disable-next-line:typedef
  async ngOnInit() {
    await this.authService.listUsers().toPromise().then((data) => {
      this.users = data.data;
      this.usersFilter = this.users;
    });
    //   this.users = resp.data);
    // this.usersFilter = this.users;
  }

  // tslint:disable-next-line:typedef
  showModal(user: any) {

  }

  // tslint:disable-next-line:typedef
  consultUser(user: NewUsuario) {

  }

  // tslint:disable-next-line:typedef
  modifyUser(user: NewUsuario) {

  }

  // tslint:disable-next-line:typedef
  newUser() {
    this.toUpdateUser = null;
    this.consultingUser = false;
    this.openDialog();
  }

  // tslint:disable-next-line:typedef
  filtrarUser($event: KeyboardEvent) {

  }

  // tslint:disable-next-line:typedef
  backPage() {
    // this.router.navigate('/seguridad');
    window.history.back();
  }

  // tslint:disable-next-line:typedef
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '500px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      user: this.toUpdateUser,
      consulting: this.consultingUser
    };
    const modalDialog = this.matDialog.open(LogoutComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      // this.articuloService.listarArticuloTodos().subscribe(data => {
      //   this.articulos = data.data;
      //   this.articulosFilter = data.data;
      // });
    });
  }
}
