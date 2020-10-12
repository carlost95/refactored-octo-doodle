import {Router} from '@angular/router';
import {ComprasService} from './../../service/compras.service';
import {Articulo} from './../../modelo/Articulo';

import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ExcelExportService} from '../../service/excel-export.service';
import {ArticuloExcel} from '../../modelo/ArticuloExcel';
import {ServiceReportService} from '../../service/service-report.service';
import {PdfExportService} from '../../service/pdf-export.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AgregarArticuloComponent} from '../agregar-articulo/agregar-articulo.component';
import {ArticulosService} from '../../service/articulos.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-listar-articulos',
  templateUrl: './listar-articulos.component.html',
  styleUrls: ['./listar-articulos.component.css'],
})


export class ListarArticulosComponent implements OnInit {

  constructor(
    private serviceCompra: ComprasService,
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

  export = true;
  //PAGINATOR
  // tslint:disable-next-line:variable-name
  page_number = 1;
  // tslint:disable-next-line:variable-name
  page_size = 5;
  pageSizeOptions = [5, 7];


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
    console.log('-----------ARTICULOS-------------');
    console.warn(this.articulos);


  }

  // tslint:disable-next-line:typedef
  handlePage(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex + 1;
  }
  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.articulosFilter.filter = filterValue.trim().toLowerCase();
    //
    // if (this.articulosFilter.paginator) {
    //   this.articulosFilter.paginator.firstPage();
    // }
  }
  // tslint:disable-next-line: typedef
  modificarArticulo(articulo: Articulo) {
    this.toUpdateArticulo = articulo;
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

  // tslint:disable-next-line:typedef
  newArticulo() {
    this.toUpdateArticulo = null;
    this.openDialog();
  }

  // tslint:disable-next-line:typedef
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    // dialogConfig.height = '700px';
    // dialogConfig.width = '900px';
    dialogConfig.data = this.toUpdateArticulo;
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

}

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];
// export class PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }



