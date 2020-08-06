import { VentasService } from "./../../service/ventas.service";
import { Router } from "@angular/router";
import { Cliente } from "../../modelo/Cliente";
import { Component, OnInit } from "@angular/core";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { MatDialogModule } from "@angular/material";

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

  constructor(private service: VentasService, private router: Router) { }
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
  exportarExcel() { }

  exportarPDF() {
    this.service.getReporteBancoPdf().subscribe(resp => {
      const arrayBuffer = this.base64ToArrayBuffer(resp.data.file);
      this.createAndDownloadBlobFile(arrayBuffer, resp.data.name);
    });
  }

  base64ToArrayBuffer(base64: string) {
    const binaryString = window.atob(base64); // Comment this if not using base64
    const bytes = new Uint8Array(binaryString.length);
    return bytes.map((byte, i) => binaryString.charCodeAt(i));
  }

  createAndDownloadBlobFile(body, filename, extension = 'pdf') {
    const blob = new Blob([body]);
    const fileName = `${filename}.${extension}`;
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, fileName);
    } else {
      const link = document.createElement('a');
      // Browsers that support HTML5 download attribute
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', fileName);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}
