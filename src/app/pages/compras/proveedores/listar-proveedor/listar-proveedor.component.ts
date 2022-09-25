import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from '@shared/confirm-modal/confirm-modal.component';
import { ProveedoresService } from '@service/proveedores.service';
import { AgregarProveedorComponent } from '../agregar-proveedor/agregar-proveedor.component';
import { SnackConfirmComponent } from '@shared/snack-confirm/snack-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from '@service/token.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BuscadorService } from '@shared/helpers/buscador.service';
import { Titulo } from '@app/pages/compras/proveedores/model/titulo.enum';
import { TipoModal } from '@shared/models/tipo-modal.enum';
import { Router } from '@angular/router';
import { Proveedor } from '../../../../models/Proveedor';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.css'],
})
export class ListarProveedorComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Proveedor>;
  displayedColumns: string[] = [
    'razonSocial',
    'cuit',
    'telefono',
    'email',
    'habilitado',
    'acciones',
  ];

  proveedores: Proveedor[];
  mostrarModificacion: boolean;

  proveedor: Proveedor = new Proveedor();
  consulting: boolean;
  roles: string[];

  constructor(
    private readonly buscadorService: BuscadorService,
    private readonly proveedorService: ProveedoresService,
    public matDialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarModificacion =
      this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_GERENTE');
    this.proveedorService.getAllProveedores().subscribe((data) => {
      this.proveedores = data;
      this.establecerDatasource(this.proveedores);
    });
  }

  filtrarProveedor(value: string): void {
    const TERMINO = 'razonSocial';
    const proveedores = this.buscadorService.buscarTermino(
      this.proveedores,
      TERMINO,
      value
    );
    this.establecerDatasource(proveedores);
  }

  establecerDatasource(proveedores: Proveedor[]): void {
    this.dataSource = new MatTableDataSource(proveedores);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  newProveedor(): void {
    const data = {
      titulo: Titulo.creacion,
      tipoModal: TipoModal.creacion,
    };
    this.openDialogProveedor(data);
  }

  modificarProveedor(proveedor: Proveedor): void {
    const data = {
      titulo: Titulo.actualizacion,
      tipoModal: TipoModal.actualizacion,
      proveedor,
    };
    this.openDialogProveedor(data);
  }

  consultarProveedor(proveedor: Proveedor): void {
    const data = {
      titulo: Titulo.consulta,
      tipoModal: TipoModal.consulta,
      proveedor,
    };
    this.openDialogProveedor(data);
  }

  openDialogProveedor(data: any): void {
    const dialog = this.matDialog.open(AgregarProveedorComponent, {
      id: 'modal-component',
      disableClose: true,
      height: 'auto',
      width: '20rem',
      data,
      panelClass: 'no-padding',
    });
    // The user can't close the dialog by clicking outside its body
    dialog.afterClosed().subscribe((result) => {
      this.proveedorService.getAllProveedores().subscribe((proveedores) => {
        this.proveedores = proveedores;
        this.establecerDatasource(this.proveedores);
      });
      if (result) {
        this.openSnackBar(result);
      }
    });
  }

  showModal(proveedor: Proveedor): void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '15rem';
    dialogConfig.width = '20rem';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: proveedor.habilitado,
    };
    const modalDialog = this.matDialog.open(
      ConfirmModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result.state) {
        this.proveedorService
          .changeStatusProveedor(proveedor.idProveedor)
          .pipe(concatMap((data) => this.proveedorService.getAllProveedores()))
          .subscribe((proveedores) => {
            this.proveedores = proveedores;
            this.establecerDatasource(proveedores);
          });
        this.openSnackBar(proveedor.razonSocial + ' cambio de estado');
      } else {
        this.openSnackBar('Error al ejecutar cambio de estado');
      }
    });
  }
  cuentaProveedor(idProveedor: number): void {
    this.router.navigate([`compras/listar-cuentas/${idProveedor}`]);
  }
  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
}
