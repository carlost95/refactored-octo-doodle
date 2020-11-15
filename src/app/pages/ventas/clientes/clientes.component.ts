import {Router} from '@angular/router';
import {Cliente} from '../../../models/Cliente';
import {Component, OnInit} from '@angular/core';
import {PdfExportService} from '../../../service/pdf-export.service';
import {ServiceReportService} from '../../../service/service-report.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AgregarClienteComponent} from './agregar-cliente/agregar-cliente.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackConfirmComponent} from '../../../shared/snack-confirm/snack-confirm.component';
import {ConfirmModalComponent} from '../../../shared/confirm-modal/confirm-modal.component';
import {ClienteService} from '../../../service/cliente.service';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = null;
  cliente: Cliente = null;
  clientesFilter: Cliente[] = null;

  busqueda: string = null;
  toUpdate: Cliente;
  consulting: boolean;

  isLogged = false;
  roles: string[];
  isAdmin = false;
  isGerente = false;

  constructor(private service: ClienteService,
              private router: Router,
              private servicePdf: PdfExportService,
              private serviceReport: ServiceReportService,
              public matDialog: MatDialog,
              private tokenService: TokenService,
              // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar) {
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
    this.service.getAll().subscribe((data) => {
      this.clientes = data.data;
      this.clientesFilter = data.data;
    });
  }

  filtrarCliente(): void {
    console.log(this.busqueda);

    this.busqueda = this.busqueda.toLowerCase();
    this.clientesFilter = this.clientes;

    if (this.busqueda !== null) {
      this.clientesFilter = this.clientes.filter((item) => {
        const inName = item.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
        const inLastName =
          item.apellido.toLowerCase().indexOf(this.busqueda) !== -1;
        const inDocument = item.dni.toLowerCase().indexOf(this.busqueda) !== -1;
        return inName || inLastName || inDocument;
      });
    }
  }

  backPage(): void {
    this.router.navigate(['ventas']);
  }


  exportarExcel(): void {
    console.warn('muestra de excel');

  }

  exportarPDF(): void {
    this.serviceReport.getReporteBancoPdf().subscribe(resp => {
      this.servicePdf.createAndDownloadBlobFile(this.servicePdf.base64ToArrayBuffer(resp.data.file), resp.data.name);
    });
  }

  newClient(): void {
    this.toUpdate = null;
    this.consulting = false;
    this.openDialog();
  }

  editClient(client: Cliente): void {
    this.toUpdate = client;
    this.consulting = false;
    this.openDialog();
  }

  readClient(client: Cliente): void {
    this.toUpdate = client;
    this.consulting = true;
    this.openDialog();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '540px';
    dialogConfig.width = '300px';
    dialogConfig.data = {
      cliente: this.toUpdate,
      consulting: this.consulting
    };
    const modalDialog = this.matDialog.open(AgregarClienteComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar();
      }
      this.getData();
    });
  }

  showModal(cliente: Cliente): void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: cliente.estado
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        this.service.changeStatus(cliente.id).subscribe(result => {
          this.getData();
        });
      } else {
        this.getData();
      }
    });
  }

  direcciones(id: number): void {
    this.router.navigate([`/ventas/direcciones/${id}`]);
  }

  openSnackBar(): void {
    this._snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
    });
  }

}
