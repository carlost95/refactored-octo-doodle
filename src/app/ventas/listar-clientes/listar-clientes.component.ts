import {VentasService} from "./../../service/ventas.service";
import {Router} from "@angular/router";
import {Cliente} from "../../modelo/Cliente";
import {Component, OnInit} from "@angular/core";
import {PdfExportService} from '../../service/pdf-export.service';
import {ServiceReportService} from '../../service/service-report.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AgregarClienteComponent} from "../agregar-cliente/agregar-cliente.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SnackConfirmComponent} from "../../shared/snack-confirm/snack-confirm.component";
import {Banco} from "../../modelo/Banco";
import {ConfirmModalComponent} from "../../shared/confirm-modal/confirm-modal.component";
import {ClienteService} from "../../service/cliente.service";

@Component({
  selector: "app-listar-clientes",
  templateUrl: "./listar-clientes.component.html"
})
export class ListarClientesComponent implements OnInit {
  clientes: Cliente[] = null;
  cliente: Cliente = null;
  clientesFilter: Cliente[] = null;

  busqueda: string = null;
  toUpdate: Cliente;
  consulting: boolean;

  constructor(private service: ClienteService,
              private router: Router,
              private servicePdf: PdfExportService,
              private serviceReport: ServiceReportService,
              public matDialog: MatDialog,
              private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.service.getAll().subscribe((data) => {
      this.clientes = data.data;
      this.clientesFilter = data.data;
    });
  }
  modificarCliente(cliente: Cliente) {
    this.router.navigate(["/ventas/modificar-cliente/" + cliente.id]);
  }

  filtrarCliente() {
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

  backPage() {
    window.history.back();
  }

  consultaCliente() {
  }

  exportarExcel() {
    console.warn('muestra de excel');

  }

  exportarPDF() {
    this.serviceReport.getReporteBancoPdf().subscribe(resp => {
      this.servicePdf.createAndDownloadBlobFile(this.servicePdf.base64ToArrayBuffer(resp.data.file), resp.data.name);
    });
  }

  newClient() {
    this.toUpdate = null;
    this.consulting = false;
    this.openDialog();
  }

  editClient(client: Cliente) {
    this.toUpdate = client;
    this.consulting = false;
    this.openDialog();
  }

  readClient(client: Cliente){
    this.toUpdate = client;
    this.consulting = true;
    this.openDialog();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '540px'
    dialogConfig.width = '300px';
    dialogConfig.data = {
      cliente: this.toUpdate,
      consultar: this.consulting
    };
    const modalDialog = this.matDialog.open(AgregarClienteComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.openSnackBar();
      this.getData();
    })
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
    });
  }
  showModal(cliente: Cliente) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: 'Desea cambiar estado?',
      title: 'Cambio estado',
      state: cliente.estado
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        this.service.changeStatus(cliente.id).subscribe(result => {
          this.getData();
        })
      } else {
        this.getData();
      }
    });
  }
}
