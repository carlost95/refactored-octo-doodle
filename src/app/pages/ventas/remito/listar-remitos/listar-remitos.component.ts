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
      this.roles.includes('ROLE_ADMIN_BANCO');

    this.remitoService.getAllRemitos().subscribe(remitos => {
      this.remitos = remitos;
      this.establecerDatasource(remitos);
      console.log(remitos);

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

  showModal(remito: Remito): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '15rem';
    dialogConfig.width = '20rem';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: remito.entregado,
    };
    const modalDialog = this.matDialog.open(
      ConfirmModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result.state) {

        // this.remitoService.changeStatusRemito(remito)
        //   .pipe(concatMap((data) => this.remitoService.getAllRemitos()))
        //   .subscribe((remitos) => {
        //     this.remitos = remitos;
        //     this.establecerDatasource(this.remitos);
        //   });
        this.router.navigate([`/ventas/consultar-remito/${remito.idRemito}`]);

        this.openSnackBar(remito.nroRemito + ' cambio de estado');
      } else {
        this.openSnackBar('Error al ejecutar cambio de estado');
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
