import { VentasService } from "./../../service/ventas.service";
import { Router } from "@angular/router";
import { Cliente } from "../../modelo/Cliente";
import { Component, OnInit } from "@angular/core";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { MatDialogModule } from "@angular/material";
import { PdfExportService } from '../../service/pdf-export.service';
import { ServiceReportService } from '../../service/service-report.service';

@Component({
  selector: "app-listar-clientes",
  templateUrl: "./listar-clientes.component.html",
  styleUrls: ["./listar-clientes.component.css"],
})
export class ListarClientesComponent implements OnInit {
  clientes: Cliente[] = null;
  cliente: Cliente = null;
  clientesFilter: Cliente[] = null;

  busqueda: string = null;

  constructor(private service: VentasService, private router: Router,
    private servicePdf: PdfExportService, private serviceReport: ServiceReportService) { }
  ngOnInit() {
    this.service.listarClientesTodos().subscribe((data) => {
      this.clientes = data.data;
      this.clientesFilter = data.data;
    });
  }
  modificarCliente(cliente: Cliente) {
    this.router.navigate(["/ventas/modificar-cliente/" + cliente.id]);
  }
  inhabilitarCliente(cliente: Cliente) {
    let resultado: boolean;
    resultado = confirm("¿DESEA ELIMINAR CLIENTE?");
    if (resultado === true) {
      this.service.deshabilitarCliente(cliente.id).subscribe((data) => {
        window.location.reload();
      });
    }
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
  consultaCliente() { }
  exportarExcel() {
    console.warn('muestra de excel');

  }

  exportarPDF() {
    this.serviceReport.getReporteBancoPdf().subscribe(resp => {
      this.servicePdf.createAndDownloadBlobFile(this.servicePdf.base64ToArrayBuffer(resp.data.file), resp.data.name);
    });
  }

}
