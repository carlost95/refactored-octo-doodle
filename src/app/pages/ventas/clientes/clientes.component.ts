import { Router } from '@angular/router';
import { Cliente } from '../../../models/Cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PdfExportService } from '../../../service/pdf-export.service';
import { ServiceReportService } from '../../../service/service-report.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackConfirmComponent } from '../../../shared/snack-confirm/snack-confirm.component';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { ClienteService } from '../../../service/cliente.service';
import { TokenService } from '../../../service/token.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BuscadorService } from '../../../shared/helpers/buscador.service';
import { cliente } from '../../../../environments/global-route';
import { TituloCliente } from '../../../shared/models/titulo-cliente.enum';
import { TipoModal } from '../../../shared/models/tipo-modal.enum';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Cliente>;
  displayedColumns: string[] = ['nombre', 'apellido', 'dni', 'email', 'status'];

  clientes: Cliente[];
  mostrarModificacion: boolean;

  cliente: Cliente = new Cliente();
  roles: string[];

  constructor(
    private readonly buscadorService: BuscadorService,
    private clientService: ClienteService,
    private router: Router,
    public matDialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarModificacion =
      this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_GERENTE');
    this.clientService.getAllClient().subscribe((resp) => {
      this.clientes = resp;
      this.establecerDatasource(this.clientes);
    });
  }

  filtrarClient(value: string): void {
    const TERMINO = 'nombre';
    const clientes = this.buscadorService.buscarTermino(
      this.clientes,
      TERMINO,
      value
    );
    this.establecerDatasource(clientes);
  }
  establecerDatasource(clientes: Cliente[]): void {
    this.dataSource = new MatTableDataSource(clientes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  backPage(): void {
    this.router.navigate(['ventas']);
  }

  newClient(): void {
    const data = {
      titulo: TituloCliente.creacion,
      tipoModal: TipoModal.creacion,
    };
    this.openDialog(data);
  }

  openDialog(data: any): void {
    const dialog = this.matDialog.open(AgregarClienteComponent, {
      id: 'modal-component',
      disableClose: true,
      height: 'auto',
      width: '20rem',
      data,
      panelClass: 'no-padding',
    });
    // The user can't close the dialog by clicking outside its body
    dialog.afterClosed().subscribe((result) => {
      this.clientService.getAllClient().subscribe((clientes) => {
        this.clientes = clientes;
        this.establecerDatasource(this.clientes);
      });
      if (result) {
        this.openSnackBar(result);
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
  showModal(cliente: Cliente): void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '15rem';
    dialogConfig.width = '20rem';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: cliente.status,
    };
    const modalDialog = this.matDialog.open(
      ConfirmModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result.state) {
        this.clientService
          .changeStatusClient(cliente.id)
          .pipe(concatMap((data) => this.clientService.getAllClient()))
          .subscribe((clientes) => {
            this.clientes = clientes;
            this.establecerDatasource(this.clientes);
          });
      } else {
        // this.getData();
      }
    });
  }
  // exportarExcel(): void {
  //   console.warn('muestra de excel');
  // }

  // exportarPDF(): void {
  //   this.serviceReport.getReporteBancoPdf().subscribe((resp) => {
  //     this.servicePdf.createAndDownloadBlobFile(
  //       this.servicePdf.base64ToArrayBuffer(resp.data.file),
  //       resp.data.name
  //     );
  //   });
  // }

  // editClient(client: Cliente): void {
  //   this.toUpdate = client;
  //   this.consulting = false;
  //   this.openDialog();
  // }

  // readClient(client: Cliente): void {
  //   this.toUpdate = client;
  //   this.consulting = true;
  //   this.openDialog();
  // }

  // openDialog(): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = 'modal-component';
  //   dialogConfig.height = '540px';
  //   dialogConfig.width = '300px';
  //   dialogConfig.data = {
  //     cliente: this.toUpdate,
  //     consulting: this.consulting,
  //   };
  //   const modalDialog = this.matDialog.open(
  //     AgregarClienteComponent,
  //     dialogConfig
  //   );
  //   modalDialog.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.openSnackBar();
  //     }
  //     this.getData();
  //   });
  // }

  // showModal(cliente: Cliente): void {
  //   const dialogConfig = new MatDialogConfig();
  //   // The user can't close the dialog by clicking outside its body
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = 'modal-component';
  //   dialogConfig.height = '300px';
  //   dialogConfig.width = '350px';
  //   dialogConfig.data = {
  //     message: '¿Desea cambiar estado?',
  //     title: 'Cambio estado',
  //     state: cliente.estado,
  //   };
  //   const modalDialog = this.matDialog.open(
  //     ConfirmModalComponent,
  //     dialogConfig
  //   );
  //   modalDialog.afterClosed().subscribe((result) => {
  //     if (result.state) {
  //       this.service.changeStatus(cliente.id).subscribe((result) => {
  //         this.getData();
  //       });
  //     } else {
  //       this.getData();
  //     }
  //   });
  // }

  direcciones(id: number): void {
    this.router.navigate([`/ventas/direcciones/${id}`]);
  }

  // openSnackBar(): void {
  //   this._snackBar.openFromComponent(SnackConfirmComponent, {
  //     panelClass: ['error-snackbar'],
  //     duration: 5 * 1000,
  //   });
  // }
}
