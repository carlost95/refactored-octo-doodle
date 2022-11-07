import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewUsuario } from '../../../models/new-usuario';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BuscadorService } from '../../../shared/helpers/buscador.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackConfirmComponent } from '../../../shared/snack-confirm/snack-confirm.component';
import { TokenService } from '../../../service/token.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<NewUsuario>;
  displayedColumns: string[] = [
    'nombreUsuario',
    'rol',
    'correo',
    'acciones',
  ];

  usersFilter: NewUsuario[] = [];
  users: NewUsuario[] = [];
  busqueda: any;
  toUpdateUser: NewUsuario;
  consultingUser: boolean;
  mostrar: boolean;
  roles: string[];

  constructor(
    public matDialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private buscadorService: BuscadorService,
    private snackBar: MatSnackBar,
    private tokenService: TokenService

  ) {
  }

  async ngOnInit() {
    this.roles = this.tokenService.getAuthorities();
    this.mostrar = this.roles.includes('ROLE_ADMIN');
    await this.authService.listUsers().toPromise().then((data) => {
      this.users = data.data;
      this.establecerDatasource(this.users)
    });
  }
  establecerDatasource(usuarios: NewUsuario[]): void {
    this.dataSource = new MatTableDataSource(usuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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


  filtrarUser(value: string): void {
    const TERMINO = 'nombreUsuario';
    const usuarios = this.buscadorService.buscarTermino(
      this.users,
      TERMINO,
      value
    );
    this.establecerDatasource(usuarios);
  }

  backPage(): void {
    this.router.navigate(['/seguridad']);
  }

  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = 'auto';
    dialogConfig.width = '25rem';
    dialogConfig.data = {
      user: this.toUpdateUser,
      consulting: this.consultingUser
    };
    const modalDialog = this.matDialog.open(RegisterComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.authService.listUsers().subscribe(data => {
        this.establecerDatasource(data.data)
      });
    });
  }
}
