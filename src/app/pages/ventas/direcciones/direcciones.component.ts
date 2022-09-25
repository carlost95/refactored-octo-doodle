import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DireccionesService } from '../../../service/direcciones.service';
import { Direccion } from '../../../models/Direccion';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackConfirmComponent } from '../../../shared/snack-confirm/snack-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BuscadorService } from '../../../shared/helpers/buscador.service';
import { TituloDireccion } from '../../../shared/models/titulo-direccin.enum';
import { TipoModal } from '../../../shared/models/tipo-modal.enum';
import { TokenService } from '../../../service/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';
import { CrearDireccionComponent } from './crear-direccion/crear-direccion.component';
import { ClienteService } from '@app/service/cliente.service';
import { Cliente } from '@app/models/cliente';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.scss'],
})
export class DireccionesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Direccion>;
  displayedColumns: string[] = [
    'calle',
    'numero',
    'entreCalle',
    'barrio',
    'status',
    'acciones',
  ];
  direcciones: Direccion[];
  mostrarModificacion: boolean;
  direccion: Direccion = new Direccion();
  roles: string[];
  idCliente: number;
  cliente: Cliente;

  constructor(
    private readonly buscadorService: BuscadorService,
    private route: ActivatedRoute,
    private direccionService: DireccionesService,
    public matDialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarModificacion =
      this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_GERENTE');

    this.route.params.subscribe((p) => {
      this.idCliente = Number(p['idCliente']);
      this.loadingDirection();
    });
  }

  loadingDirection(): void {
    this.direccionService.getAllDirectionByClientId(this.idCliente).subscribe(
      (data) => {
        this.direcciones = data;
        this.establecerDatasource(this.direcciones);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(error.error);
      }
    );
  }
  filtrarDirection(value: string): void {
    const TERMINO = 'calle';
    const direcciones = this.buscadorService.buscarTermino(
      this.direcciones,
      TERMINO,
      value
    );
    this.establecerDatasource(direcciones);
  }
  establecerDatasource(direcciones: Direccion[]): void {
    this.dataSource = new MatTableDataSource(direcciones);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDirecciones() {
    this.direccionService.getByClientId(this.idCliente).subscribe((resp) => {
      this.direcciones = resp.data;
    });
  }

  backPage() {
    window.history.back();
  }

  newDirection(): void {
    const data = {
      titulo: TituloDireccion.creacion,
      tipoModal: TipoModal.creacion,
      idCliente: this.idCliente,
    };
    this.openDialog(data);
  }
  consultDirection(direccion: Direccion): void {
    const data = {
      titulo: TituloDireccion.consulta,
      tipoModal: TipoModal.consulta,
      idCliente: this.idCliente,
      direccion,
    };
    this.openDialog(data);
  }
  updatedDirection(direccion: Direccion) {
    const data = {
      titulo: TituloDireccion.actualizacion,
      tipoModal: TipoModal.actualizacion,
      idCliente: this.idCliente,
      direccion
    };
    this.openDialog(data);
  }
  openDialog(data: any): void {
    const dialog = this.matDialog.open(CrearDireccionComponent, {
      id: 'modal-component',
      disableClose: true,
      height: 'auto',
      width: '40rem',
      data,
      panelClass: 'no-padding',
    });
    dialog.afterClosed().subscribe((result) => {
      this.direccionService
        .getAllDirectionByClientId(this.idCliente)
        .subscribe((data) => {
          this.direcciones = data;
          this.establecerDatasource(this.direcciones);
        });
      if (result) {
        this.openSnackBar(result);
      }
    });
  }
  showModal(direccion: Direccion): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: direccion.status,
    };
    const modalDialog = this.matDialog.open(
      ConfirmModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result.state) {
        this.direccionService.changeStatusDirection(direccion.idDireccion)
          .pipe(concatMap((data) => this.direccionService.getAllDirectionByClientId(this.idCliente))).subscribe((data) => {
            this.direcciones = data;
            this.establecerDatasource(this.direcciones);
          });
        this.openSnackBar('Estado actualizado');
      } else {
        this.openSnackBar('Error en la actualizacion');
      }
    });
  }
  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
}
