import { Component, OnInit } from '@angular/core';
import { Departamento } from '../../../models/Departamento';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { SnackConfirmComponent } from '../../../shared/snack-confirm/snack-confirm.component';
import { Distrito } from '../../../models/Distrito';
import { DistritoService } from '../../../service/distrito.service';
import { AgregarDistritoComponent } from './agregar-distrito/agregar-distrito.component';
import { Router } from '@angular/router';
import { TokenService } from '../../../service/token.service';

@Component({
  selector: 'app-distrito',
  templateUrl: './distrito.component.html',
  styleUrls: ['./distrito.component.scss'],
})
export class DistritoComponent implements OnInit {
  distritos: Distrito[];
  private update: Distrito;
  consulting = false;
  distritosFilter: Distrito[];
  busqueda: string;

  isLogged = false;
  roles: string[];
  isAdmin = false;
  isGerente = false;

  constructor(
    private distritoService: DistritoService,
    public matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      } else if (rol === 'ROLE_GERENTE') {
        this.isGerente = true;
      }
    });
    this.getData();
  }

  getData(): void {
    this.distritoService.getDistritos().subscribe((resp) => {
      this.distritos = resp.data;
      this.distritosFilter = resp.data;
    });
  }

  showModal(departamento: Departamento): void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '350px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: true,
    };
    const modalDialog = this.matDialog.open(
      ConfirmModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result.state) {
        // tslint:disable-next-line:no-shadowed-variable
        this.distritoService
          .changeStatus(departamento.idDepartamento)
          .subscribe((result) => {
            this.getData();
          });
      } else {
        this.getData();
      }
    });
  }

  nuevo(): void {
    this.consulting = false;
    this.update = undefined;
    this.openDialog();
  }

  consultar(distrito: Distrito): void {
    this.consulting = true;
    this.update = distrito;
    this.openDialog();
  }

  editar(distrito: Distrito): void {
    this.consulting = false;
    this.update = distrito;
    this.openDialog();
  }

  volver(): void {
    this.router.navigate(['abm-ventas']);
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      distritos: this.distritos,
      distrito: this.update,
      consultar: this.consulting,
    };
    const modalDialog = this.matDialog.open(
      AgregarDistritoComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.openSnackBar(result);
      }
      this.getData();
    });
  }

  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }

  filterDistrito(event: any): void {
    this.busqueda = this.busqueda.toLowerCase();
    this.distritosFilter = this.distritos;
    if (this.busqueda !== null) {
      this.distritosFilter = this.distritos.filter((item) => {
        const nombre = item.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
        const abreviatura =
          item.abreviatura.toLowerCase().indexOf(this.busqueda) !== -1;
        return nombre || abreviatura;
      });
    }
  }
}
