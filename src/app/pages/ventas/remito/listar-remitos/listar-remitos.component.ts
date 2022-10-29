import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Remito, RemitoConsult } from '../../../../models/Remito';
import { MatTableDataSource } from '@angular/material/table';
import { RemitoService } from '../../../../service/remito.service';
import { BuscadorService } from '../../../../shared/helpers/buscador.service';
import { TokenService } from '../../../../service/token.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmModalComponent } from '../../../../shared/confirm-modal/confirm-modal.component';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SnackConfirmComponent } from '../../../../shared/snack-confirm/snack-confirm.component';
import { RemitoModalComponent } from '../../../../shared/remito-modal/remito-modal.component';


@Component({
  selector: 'app-listar-remitos',
  templateUrl: './listar-remitos.component.html',
  styleUrls: ['./listar-remitos.component.scss']
})
export class ListarRemitosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Remito>;
  displayedColumns: string[] = [
    'nroRemito',
    'nombreCliente',
    'direccion',
    'fecha',
    'entregado',
    'acciones',
  ];

  remitos: Remito[] = [];
  remito: Remito;
  remitoConsult: RemitoConsult;
  mostrarHabilitacion: boolean;
  roles: string[];

  constructor(
    private readonly remitoService: RemitoService,
    private readonly buscadorService: BuscadorService,
    private readonly tokenService: TokenService,
    private readonly router: Router,
    public matDialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion =
      this.roles.includes('ROLE_ADMIN') ||
      this.roles.includes('ROLE_GERENTE');

    this.remitoService.getAllRemitos().subscribe(remitos => {
      this.remitos = remitos;
      this.establecerDatasource(remitos);
    });
  }
  establecerDatasource(remitos: Remito[]): void {
    this.dataSource = new MatTableDataSource(remitos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filtrarRemitos(value: string): void {
    const TERMINO = 'nroRemito';
    const remitos = this.buscadorService.buscarTerminoNumber(
      this.remitos,
      TERMINO,
      value
    );
    this.establecerDatasource(remitos);
  }
  consultar(row: Remito) {
    this.router.navigate([`/ventas/consultar-remito/${row.idRemito}`]);
  }
  cargarRemitos(value: number): void {
    if (value === 1) {

      this.remitoService.getAllRemitos().subscribe(remitos => {
        this.remitos = remitos;
        this.establecerDatasource(remitos);
      });
    } else if (value === 2) {
      this.remitoService.getRemitosEntregados().subscribe(remitos => {
        this.remitos = remitos;
        this.establecerDatasource(remitos);
      });
    } else if (value === 3) {
      this.remitoService.getRemitosNoEntregados().subscribe(remitos => {
        this.remitos = remitos;
        this.establecerDatasource(remitos);
      });
    }
  }

  showModal(remito: Remito): void {
    if (!this.mostrarHabilitacion) {
      this.openSnackBar("permisos insuficientes para generar esta accion")
      this.remitoService.getAllRemitos().subscribe(data =>
        this.establecerDatasource(data))
      return;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '15rem';
    dialogConfig.width = 'auto';
    dialogConfig.data = {
      message: '¿Desea cambiar el estado del remito?',
      title: 'Cambiar estado de remito',
      state: remito.entregado,
    };
    const modalDialog = this.matDialog.open(
      RemitoModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result.state) {
        this.router.navigate([`/ventas/cambiar-estado-remito/${remito.idRemito}`]);
      }
      else {
        this.cargarRemitos(3);
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
