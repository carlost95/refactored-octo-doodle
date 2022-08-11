import {Router} from '@angular/router';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ServiceReportService} from '@app/service/service-report.service';
import {PdfExportService} from '@app/service/pdf-export.service';
import {ExcelExportService} from '@app/service/excel-export.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmModalComponent} from '@shared/confirm-modal/confirm-modal.component';
import {ProveedoresService} from '@service/proveedores.service';
import {Proveedor} from '@models/Proveedor';
import {AgregarProveedorComponent} from '../agregar-proveedor/agregar-proveedor.component';
import {ProveedorExcel} from '@models/ProveedorExcel';
import {SnackConfirmComponent} from '@shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TokenService} from '@service/token.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ProveedorRest} from '@models/proveedor-rest';

@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.css']
})
export class ListarProveedorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<ProveedorRest>;
  displayedColumns: string[] = ['razonSocial', 'celular', 'telefono', 'habilitado', 'acciones'];

  proveedores: ProveedorRest [];
  mostrarModificacion: boolean;

  proveedor: Proveedor = null;
  proveedoresFilter: Proveedor[] = null;
  busqueda: string = null;
  toUpdateProveedor: any = null;
  consulting: boolean;

  isLogged = false;
  roles: string[];
  isAdmin = false;
  isGerente = false;

  constructor(
    private proveedorService: ProveedoresService,
    public matDialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarModificacion = this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_GERENTE');
    this.proveedorService.listarProveedores().subscribe((proveedores: ProveedorRest[]) => {
      this.proveedores = proveedores;
      this.establecerDatasource(this.proveedores);

    });
  }


  filtrarProveedor(value: string): void {
    const termino = value?.toLowerCase()?.trim();
    let proveedores = this.proveedores;
    if (termino){
      proveedores = this.proveedores.filter(proveedor => proveedor.razonSocial.toLowerCase().includes(termino));
    }
    this.establecerDatasource(proveedores);
  }

  establecerDatasource(proveedores: ProveedorRest[]): void {
    this.dataSource = new MatTableDataSource(proveedores);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  newProveedor(): void {
    this.toUpdateProveedor = null;
    this.consulting = false;
    this.openDialogProveedor();
  }

  modificarProveedor(proveedor: Proveedor): void {
    this.toUpdateProveedor = proveedor;
    this.consulting = false;
    this.openDialogProveedor();
  }

  consultarProveedor(proveedor: Proveedor): void {
    this.toUpdateProveedor = proveedor;
    this.consulting = true;
    this.openDialogProveedor();
  }

  openDialogProveedor(): void {
    const dialog = this.matDialog.open(AgregarProveedorComponent, {
      id: 'modal-component',
      disableClose: true,
      height: 'auto',
      width: '20rem',
      data: {
        provider: this.toUpdateProveedor,
        consulting: this.consulting
      },
      panelClass: 'no-padding'
    });
    // The user can't close the dialog by clicking outside its body
    dialog.afterClosed().subscribe(result => {
      this.proveedorService.listarProveedores().subscribe(proveedores => {
        this.proveedores = proveedores;
        this.dataSource = new MatTableDataSource(this.proveedores);
      });
      if (result) {
        this.openSnackBar(result);
      }
      // this.getData();
    });
  }

  showModal(proveedor: Proveedor): void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: proveedor.habilitado
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        // tslint:disable-next-line:no-shadowed-variable
        this.proveedorService.cambiarHabilitacion(proveedor.id)
          .subscribe(result => {
          // this.getData();
        });
      } else {
        // this.getData();
      }
    });
  }

  // getData(): void {
  //   this.proveedorService.listarProveedoresTodos().subscribe( proveedores => {
  //     this.proveedores = proveedores;
  //     this.proveedoresFilter = proveedores;
  //   });
  // }

  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }

}
