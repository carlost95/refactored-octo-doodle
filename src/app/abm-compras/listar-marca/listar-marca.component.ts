import { Marca } from './../../modelo/Marca';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { Component, OnInit } from '@angular/core';
import { MarcasService } from '../../service/marcas.service';
import { AgregarMarcaComponent } from '../agregar-marca/agregar-marca.component';
import { ServiceReportService } from '../../service/service-report.service';
import { PdfExportService } from 'src/app/service/pdf-export.service';
import { ExcelExportService } from 'src/app/service/excel-export.service';
import { MarcaExcel } from '../../modelo/MarcaExcel';

@Component({
  selector: 'app-listar-marca',
  templateUrl: './listar-marca.component.html',
  styleUrls: ['./listar-marca.component.css']
})
export class ListarMarcaComponent implements OnInit {
  marca: Marca = null;
  marcas: Marca[] = null;
  marcaFilter: Marca[] = null;
  busqueda: string = null;
  toUpdateMarca: Marca;
  marcaExcel: MarcaExcel;
  marcasExel: MarcaExcel[] = [];

  constructor(
    private serviceMarca: MarcasService,
    private router: Router,
    public matDialog: MatDialog,
    private excelService: ExcelExportService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.serviceMarca.listarMarcaTodos().subscribe(data => {
      this.marcas = data.data;
      this.marcaFilter = data.data;
    });
  }

  // tslint:disable-next-line: typedef
  deshabilitarMarca(marca: Marca) {
  }
  // tslint:disable-next-line: typedef
  filtrar(event: any) {
    this.busqueda = this.busqueda.toLowerCase();
    this.marcaFilter = this.marcas;
    if (this.busqueda !== null) {
      this.marcaFilter = this.marcas.filter(item => {
        const inName = item.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
        const inLastName =
          item.abreviatura.toLowerCase().indexOf(this.busqueda) !== -1;
        return inName || inLastName;
      });
    }
  }
  // tslint:disable-next-line: typedef
  exportarPDF() {
    this.serviceReport.getReporteMarcaPdf().subscribe(resp => {
      this.servicePdf.createAndDownloadBlobFile(this.servicePdf.base64ToArrayBuffer(resp.data.file), resp.data.name);
    });
  }
  // tslint:disable-next-line: typedef
  exportarExcel(): void {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.marcaFilter.length; index++) {
      this.marcaExcel = new MarcaExcel(0, '', '');
      if (this.marcaFilter[index] != null) {
        this.marcaExcel.id = this.marcaFilter[index].id;
        this.marcaExcel.nombre = this.marcaFilter[index].nombre;
        this.marcaExcel.abreaviatura = this.marcaFilter[index].abreviatura;
      }
      this.marcasExel.push(this.marcaExcel);

    }
    this.excelService.exportToExcel(this.marcasExel, 'Reporte Marcas');
  }

  // tslint:disable-next-line: typedef
  backPage() {
    window.history.back();
  }
  // tslint:disable-next-line: typedef
  newMarca() {
    this.toUpdateMarca = null;
    this.openDialog();
  }
  // tslint:disable-next-line: adjacent-overload-signatures
  // tslint:disable-next-line: typedef
  modificarMarca(marca: Marca) {
    this.toUpdateMarca = marca;
    this.openDialog();
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px'
    dialogConfig.width = '300px';
    dialogConfig.data = this.toUpdateMarca;
    const modalDialog = this.matDialog.open(AgregarMarcaComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.serviceMarca.listarMarcaTodos().subscribe(data => {
        this.marcas = data.data;
        this.marcaFilter = data.data;
      });
    });
  }
  // tslint:disable-next-line: typedef
  showModal(marca: Marca) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: 'Desea cambiar estado?',
      title: 'Cambio estado',
      state: marca.habilitacion
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        this.serviceMarca.cambiarHabilitacion(marca.id).subscribe(result => {
          this.getData();
        })
      } else {
        this.getData();
      }
    });
  }
  // tslint:disable-next-line: typedef
  getData() {
    this.serviceMarca.listarMarcaTodos().subscribe(data => {
      this.marcas = data.data;
      this.marcaFilter = data.data;
    });
  }
}
