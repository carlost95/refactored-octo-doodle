import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DireccionesService } from '../../../service/direcciones.service';
import { Direccion } from '../../../models/Direccion';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgregarDireccionComponent } from './agregar-direccion/agregar-direccion.component';
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

  constructor(
    private readonly buscadorService: BuscadorService,
    private route: ActivatedRoute,
    private direccionService: DireccionesService,
    public matDialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarModificacion =
      this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_GERENTE');

    this.route.params.subscribe((p) => {
      console.log(p);

      this.idCliente = Number(p['id']);
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
    const Direcciones = this.buscadorService.buscarTermino(
      this.direcciones,
      TERMINO,
      value
    );
    this.establecerDatasource(this.direcciones);
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
    };
    this.openDialog(data);
  }
  consultDirection(direccion: Direccion): void {
    const data = {
      titulo: TituloDireccion.consulta,
      tipoModal: TipoModal.consulta,
      direccion,
    };
    this.openDialog(data);
  }
  updatedDirection(direccion: Direccion) {
    const data = {
      titulo: TituloDireccion.actualizacion,
      tipoModal: TipoModal.actualizacion,
      direccion,
    };
    this.openDialog(data);
  }
  openDialog(data: any): void {
    const dialog = this.matDialog.open(AgregarDireccionComponent, {
      id: 'modal-component',
      disableClose: true,
      height: 'auto',
      width: '20rem',
      data,
      panelClass: 'no-padding',
    });
    // The user can't close the dialog by clicking outside its body
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
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '15rem';
    dialogConfig.width = '20rem';
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
        // this.clientService
        //   .changeStatusClient(cliente.idCliente)
        //   .pipe(concatMap((data) => this.clientService.getAllClient()))
        //   .subscribe((clientes) => {
        //     this.clientes = clientes;
        //     this.establecerDatasource(this.clientes);
        //   });
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
