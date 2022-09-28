import { Banco } from '../../../../models/Banco';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgregarBancoComponent } from '../agregar-banco/agregar-banco.component';
import { ConfirmModalComponent } from '../../../../shared/confirm-modal/confirm-modal.component';
import { BancosService } from '../../../../service/bancos.service';
import { TokenService } from '../../../../service/token.service';
import { SnackConfirmComponent } from '../../../../shared/snack-confirm/snack-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BancoRest } from '../../../../models/banco-rest';
import { BuscadorService } from '../../../../shared/helpers/buscador.service';
import { TituloBanco } from '../models/titulo-banco.enum';
import { TipoModal } from '../../../../shared/models/tipo-modal.enum';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-listar-banco',
  templateUrl: './listar-banco.component.html',
  styleUrls: ['./listar-banco.component.css'],
})
export class ListarBancoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<BancoRest>;
  displayedColumns: string[] = [
    'nombre',
    'abreviatura',
    'habilitado',
    'acciones',
  ];

  bancos: BancoRest[];

  mostrarHabilitacion: boolean;

  banco: BancoRest;
  roles: string[];

  constructor(
    private readonly buscadorService: BuscadorService,
    private readonly service: BancosService,
    public matDialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion =
      this.roles.includes('ROLE_ADMIN') ||
      this.roles.includes('ROLE_ADMIN_BANCO');
    this.service.obtenerBancos().subscribe((data) => {
      this.bancos = data;
      this.establecerDatasource(data);
    });
  }

  filtrarBancos(value: string): void {
    const TERMINO = 'nombre';
    const bancos = this.buscadorService.buscarTermino(
      this.bancos,
      TERMINO,
      value
    );
    this.establecerDatasource(bancos);
  }

  establecerDatasource(bancos: BancoRest[]): void {
    this.dataSource = new MatTableDataSource(bancos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  newBanco(): void {
    const data = {
      titulo: TituloBanco.creacion,
      tipo: TipoModal.creacion,
    };
    this.openDialog(data);
  }

  modificarBanco(banco: Banco): void {
    const data = {
      titulo: TituloBanco.actualizacion,
      tipo: TipoModal.actualizacion,
      banco,
    };
    this.openDialog(data);
  }

  consultarBanco(banco: Banco): void {
    const data = {
      titulo: TituloBanco.consulta,
      tipo: TipoModal.consulta,
      banco,
    };
    this.openDialog(data);
  }

  openDialog(data: any): void {
    const dialog = this.matDialog.open(AgregarBancoComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '20rem',
      panelClass: 'no-padding',
      data,
    });
    // const modalDialog = this.matDialog.open(AgregarBancoComponent, dialogConfig);
    dialog.afterClosed().subscribe((result) => {
      this.service.obtenerBancos().subscribe((bancos) => {
        this.bancos = bancos;
        this.establecerDatasource(bancos);
      });
      if (result) {
        this.openSnackBar(result);
      }
    });
  }

  showModal(banco: BancoRest): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = 'auto';
    dialogConfig.width = '20rem';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: banco.habilitado,
    };
    const modalDialog = this.matDialog.open(
      ConfirmModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result.state) {
        // tslint:disable-next-line:no-shadowed-variableangular
        this.service
          .actualizarEstado(banco.idBanco)
          .pipe(concatMap((data) => this.service.obtenerBancos()))
          .subscribe((bancos) => {
            this.bancos = bancos;
            this.establecerDatasource(bancos);
          });
        this.openSnackBar('Estado actualizado')
      }
      else {
        this.openSnackBar('Error al actualizar estado')
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
