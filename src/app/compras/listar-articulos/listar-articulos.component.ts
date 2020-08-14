import { Router } from '@angular/router';
import { ComprasService } from './../../service/compras.service';
import { Articulo } from './../../modelo/Articulo';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import jsPDF from "jspdf";
// import 'jspdf-autotable';
import { ExcelExportService } from '../../service/excel-export.service';
import { ArticuloExcel } from '../../modelo/ArticuloExcel';
// import { async } from "@angular/core/testing";
import { ServiceReportService } from '../../service/service-report.service';
import { PdfExportService } from '../../service/pdf-export.service';

@Component({
  selector: 'app-listar-articulos',
  templateUrl: './listar-articulos.component.html',
  styleUrls: ['./listar-articulos.component.css'],
})
export class ListarArticulosComponent implements OnInit {
  @ViewChild('listArt') content: ElementRef;

  articulos: Articulo[] = [];
  articulosFilter: Articulo[] = [];

  articulosExcel: ArticuloExcel[] = [];

  articuloExcel: ArticuloExcel;

  busqueda: string = null;
  busquedaRubro: string = null;
  busquedaCodigo: string = null;
  loaded: boolean = false;

  export: boolean = true;
  constructor(
    private serviceCompra: ComprasService,
    private router: Router,
    private excelService: ExcelExportService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService
  ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.fetchEvent().then(() => {
      console.log(this.articulos);
    });
    localStorage.clear();
    localStorage.setItem('listar', 'true');
  }

  // tslint:disable-next-line: typedef
  async fetchEvent() {
    const data = await this.serviceCompra
      .listarArticuloTodos()
      .toPromise();
    this.articulos = data.data;
    this.articulosFilter = this.articulos;
  }

  // tslint:disable-next-line: typedef
  modificarArticulo(articulo: Articulo) {
    this.router.navigate(['compras/modificar-articulo/' + articulo.id]);
  }
  // tslint:disable-next-line: typedef
  deshabilitarArticulo(articulo: Articulo) {
    let resultado: boolean;
    resultado = confirm('¿DESEA DESHABILITAR ESTE ARTICULO?');
    if (resultado === true) {
      this.serviceCompra.desabilitarArticulo(articulo.id).subscribe((data) => {
        window.location.reload();
      });
    }
  }
  // tslint:disable-next-line: typedef
  filtrarArticulo() {
    console.log(this.busqueda);

    this.busqueda = this.busqueda.toLowerCase();
    this.articulosFilter = this.articulos;

    if (this.busqueda !== null) {
      this.articulosFilter = this.articulos.filter((item) => {
        const inName = item.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
        const inLastName =
          item.codigoArt.toLowerCase().indexOf(this.busqueda) !== -1;
        const inDocument =
          item.rubroId.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
        return inName || inLastName || inDocument;
      });
    }
  }

  // tslint:disable-next-line: typedef
  backPage() {
    window.history.back();
  }
  // tslint:disable-next-line: typedef
  exportarPDF() {
    this.serviceReport.getReporteArticuloPdf().subscribe(resp => {
      this.servicePdf.createAndDownloadBlobFile(this.servicePdf.base64ToArrayBuffer(resp.data.file), resp.data.name);
    });
  }

  exportarExcel(): void {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.articulosFilter.length; index++) {
      this.articuloExcel = new ArticuloExcel('', '', 0, 0);
      if (this.articulosFilter[index] != null) {
        this.articuloExcel.codigoArt = this.articulosFilter[index].codigoArt;
        this.articuloExcel.nombre = this.articulosFilter[index].nombre;
        this.articuloExcel.stockMin = this.articulosFilter[index].stockMin;
        this.articuloExcel.stockMax = this.articulosFilter[index].stockMax;
      }
      this.articulosExcel.push(this.articuloExcel);
    }

    this.excelService.exportToExcel(this.articulosExcel, 'Reporte Articulos');
  }
}
