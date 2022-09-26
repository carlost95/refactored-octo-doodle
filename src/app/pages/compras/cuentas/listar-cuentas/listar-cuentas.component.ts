import { AgregarCuentaComponent } from './../agregar-cuenta/agregar-cuenta.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TituloAccount } from '@shared/models/titulo-account.enum';
import { TipoModal } from '@shared/models/tipo-modal.enum';
import { BuscadorService } from '../../../../shared/helpers/buscador.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../../../../service/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CuentaService } from '../../../../service/cuenta.service';
import { Cuenta } from '../../../../models/Cuenta';
import { ConfirmModalComponent } from '../../../../shared/confirm-modal/confirm-modal.component';
import { SnackConfirmComponent } from '../../../../shared/snack-confirm/snack-confirm.component';
import { concatMap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listar-cuentas',
  templateUrl: './listar-cuentas.component.html',
  styleUrls: ['./listar-cuentas.component.scss'],
})
export class ListarCuentasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Cuenta>;
  displayedColumns: string[] = [
    'titular',
    'numero',
    'cbu',
    'alias',
    'habilitado',
    'acciones',
  ];

  cuentas: Cuenta[];
  mostrarHabilitacion: boolean;
  cuenta: Cuenta;
  roles: string[];

  idProveedor: number;

  constructor(
    private readonly buscadorService: BuscadorService,
    public matDialog: MatDialog,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
    private cuentaService: CuentaService
  ) { }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion =
      this.roles.includes('ROLE_ADMIN') ||
      this.roles.includes('ROLE_ADMIN_BANCO');

    this.route.params.subscribe((p) => {
      this.idProveedor = Number(p['idProveedor']);
      this.loadingAccount();
    });
  }

  loadingAccount() {
    this.cuentaService.getAccountBankByIdProveedor(this.idProveedor).subscribe(
      (data) => {
        this.cuentas = data;
        this.establecerDatasource(this.cuentas);
      },
      (error: HttpErrorResponse) => {
        this.openSnackBar(error.error);
      }
    );
  }

  filtrarAccount(value: string): void {
    const TERMINO = 'titular';
    const cuentas = this.buscadorService.buscarTermino(
      this.cuentas,
      TERMINO,
      value
    );
    this.establecerDatasource(cuentas);
  }

  establecerDatasource(data): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  newAccountBank(): void {
    const data = {
      titulo: TituloAccount.creacion,
      tipoModal: TipoModal.creacion,
      idProveedor: this.idProveedor,
    };
    this.openDialogAccount(data);
  }

  modificarAccountBank(cuenta: Cuenta): void {
    const data = {
      titulo: TituloAccount.actualizacion,
      tipoModal: TipoModal.actualizacion,
      cuenta,
      idProveedor: this.idProveedor,
    };
    this.openDialogAccount(data);
  }

  consultAccountBank(cuenta: Cuenta): void {
    const data = {
      titulo: TituloAccount.consulta,
      tipoModal: TipoModal.consulta,
      cuenta,
      idProveedor: this.idProveedor,
    };
    this.openDialogAccount(data);
  }
  openDialogAccount(data: any): void {
    const dialog = this.matDialog.open(AgregarCuentaComponent, {
      id: 'modal-component',
      disableClose: true,
      height: 'auto',
      width: '20rem',
      data,
      panelClass: 'no-padding',
    });
    dialog.afterClosed().subscribe((result) => {
      this.cuentaService
        .getAccountBankByIdProveedor(this.idProveedor)
        .subscribe((cuentasBancarias) => {
          this.cuentas = cuentasBancarias;
          this.establecerDatasource(this.cuentas);
        });
      if (result) {
        this.openSnackBar(result);
      }
    });
  }
  showModal(cuenta: Cuenta): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '15rem';
    dialogConfig.width = '20rem';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: cuenta.habilitado,
    };
    const modalDialog = this.matDialog.open(
      ConfirmModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result.state) {
        this.cuentaService
          .changeStatusAccountBank(cuenta.id)
          .pipe(concatMap((data) =>
            this.cuentaService.getAccountBankByIdProveedor(this.idProveedor)
          )
          )
          .subscribe((cuentas) => {
            this.cuentas = cuentas;
            this.establecerDatasource(this.cuentas);
          });
        this.openSnackBar("Se actualizo el estado de la cuenta");
      } else {
        this.openSnackBar('No se pudo hacer el cambio de estado ');
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
