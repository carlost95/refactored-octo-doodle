import {Router} from '@angular/router';
import {PedidosService} from '../../../service/pedidos.service';
import {Articulo} from '../../../modelo/Articulo';

import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ExcelExportService} from '../../../service/excel-export.service';
import {ArticuloExcel} from '../../../modelo/ArticuloExcel';
import {ServiceReportService} from '../../../service/service-report.service';
import {PdfExportService} from '../../../service/pdf-export.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AgregarArticuloComponent} from '../agregar-articulo/agregar-articulo.component';
import {ArticulosService} from '../../../service/articulos.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ConfirmModalComponent} from '../../../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-listar-articulos',
  templateUrl: './listar-articulos.component.html',
  styleUrls: ['./listar-articulos.component.css'],
})


export class ListarArticulosComponent implements OnInit {

  constructor(
    private serviceCompra: PedidosService,
    private articuloService: ArticulosService,
    private router: Router,
    private excelService: ExcelExportService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService,
    public matDialog: MatDialog,
  ) {
  }

  articulos: Articulo[] = [];
  articulosFilter: Articulo[] = [];

  articulosExcel: ArticuloExcel[] = [];

  articuloExcel: ArticuloExcel;

  busqueda: string = null;
  toUpdateArticulo: Articulo;
  consultingArticulo: boolean;

  export = true;

  // tslint:disable-next-line:variable-name
  page_number = 1;
  // tslint:disable-next-line:variable-name
  page_size = 5;
  pageSizeOptions = [5, 6, 7];

  articuloAll: Articulo [] = [];


  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.fetchEvent().then(() => {
    });
    localStorage.clear();
    localStorage.setItem('listar', 'true');
    // this.dataSource.paginator = this.paginator;
  }

  // tslint:disable-next-line: typedef
  async fetchEvent() {
    const data = await this.articuloService
      .listarArticuloTodos()
      .toPromise();
    this.articulos = data.data;
    // tslint:disable-next-line:one-variable-per-declaration
    this.articulosFilter = this.articulos;
    this.articuloAll = data.data;
    console.log('-----------ARTICULOS-------------');
    console.warn(this.articulos);


  }

  // tslint:disable-next-line:typedef
  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }

  // tslint:disable-next-line:typedef
  consultarArticulo(articulo: Articulo) {
    console.log(articulo);
    this.toUpdateArticulo = articulo;
    this.consultingArticulo = true;
    this.openDialog();
  }

  // tslint:disable-next-line: typedef
  modificarArticulo(articulo: Articulo) {
    this.toUpdateArticulo = articulo;
    this.consultingArticulo = false;
    this.openDialog();

  }

  // tslint:disable-next-line: typedef
  deshabilitarArticulo(articulo: Articulo) {
    let resultado: boolean;
    resultado = confirm('¿DESEA DESHABILITAR ESTE ARTICULO?');
    if (resultado === true) {
      this.articuloService.desabilitarArticulo(articulo.id).subscribe((data) => {
        window.location.reload();
      });
    }
  }

  // tslint:disable-next-line: typedef
  filtrarArticulo() {
    this.busqueda = this.busqueda.toLowerCase();
    this.articulosFilter = this.articuloAll;

    if (this.busqueda !== null) {
      this.page_number = 1;

      this.articulosFilter = this.articuloAll.filter((item) => {
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

  // tslint:disable-next-line:typedef
  newArticulo() {
    this.toUpdateArticulo = null;
    this.consultingArticulo = false;
    this.openDialog();
  }

  // tslint:disable-next-line:typedef
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.data = {
      article: this.toUpdateArticulo,
      consulting: this.consultingArticulo
    };
    const modalDialog = this.matDialog.open(AgregarArticuloComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.articuloService.listarArticuloTodos().subscribe(data => {
        this.articulos = data.data;
        this.articulosFilter = data.data;
      });
    });
  }

  // tslint:disable-next-line:typedef
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
  // tslint:disable-next-line:typedef
  showModal(articulo: Articulo){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: articulo.habilitacion
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        // tslint:disable-next-line:no-shadowed-variable
        this.articuloService.cambiarHabilitacion(articulo.id).subscribe(result => {
          this.getData();
        });
      } else {
        this.getData();
      }
    });
  }
  // tslint:disable-next-line: typedef
  getData() {
    this.articuloService.listarArticuloTodos().subscribe(data => {
      this.articulos = data.data;
      this.articulosFilter = data.data;
    });
  }

}


