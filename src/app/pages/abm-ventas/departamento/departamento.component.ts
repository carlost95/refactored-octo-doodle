import {Component, OnInit} from '@angular/core';
import {DepartamentosService} from '../../../service/departamentos.service';
import {Departamento} from '../../../models/Departamento';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AgregarDepartamentoComponent} from './agregar-departamento/agregar-departamento.component';
import {SnackConfirmComponent} from '../../../shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmModalComponent} from '../../../shared/confirm-modal/confirm-modal.component';
import {TokenService} from '../../../service/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {

  departamentos: Departamento[];
  departamentosFilter: Departamento[];
  private update: Departamento;
  consulting = false;
  busqueda: string = null;

  isLogged = false;
  roles: string[];
  isAdmin = false;
  isGerente = false;

  constructor(
    private departamentoService: DepartamentosService,
    public matDialog: MatDialog,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      } else if (rol === 'ROLE_GERENTE') {
        this.isGerente = true;
      }
    });
    this.getData();
  }

  getData(): void {
    this.departamentoService.getAll().subscribe(resp => {
      this.departamentos = resp.data;
      this.departamentosFilter = this.departamentos;
      console.log(resp.data);
    });
  }

  showModal(departamento: Departamento): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: departamento.estado
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        this.departamentoService.changeStatus(departamento.id).subscribe(result => {
          this.getData();
        });
      } else {
        this.getData();
      }
    });
  }

  filtrarDepartamento(event: any): void {
    this.busqueda = this.busqueda.toLowerCase();
    this.departamentosFilter = this.departamentos;
    if (this.busqueda !== null) {
      this.departamentosFilter = this.departamentos.filter(item => {
        const nombre = item.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
        const abreviatura = item.abreviatura.toLowerCase().indexOf(this.busqueda) !== -1;
        return nombre || abreviatura;
      });
    }
  }

  nuevo(): void {
    this.consulting = false;
    this.update = undefined;
    this.openDialog();

  }

  consultar(departamento: Departamento): void {
    this.consulting = true;
    this.update = departamento;
    this.openDialog();
  }

  editar(departamento: Departamento): void {
    this.consulting = false;
    this.update = departamento;
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
    dialogConfig.width = '300px';
    dialogConfig.data = {
      departamentos: this.departamentos,
      departamento: this.update,
      consulting: this.consulting
    };
    const modalDialog = this.matDialog.open(AgregarDepartamentoComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar(result);
      }
      this.getData();
    });
  }

  openSnackBar(msg: string): void {
    this._snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
}
