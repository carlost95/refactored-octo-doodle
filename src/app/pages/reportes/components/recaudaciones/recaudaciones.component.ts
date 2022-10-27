import { Component, OnInit, ViewChild } from '@angular/core';
import { ReporteService } from '@service/reporte.service';
import _ from 'lodash';
import { ReporteFechas } from '../../../../models/ReporteFechas';
import moment from "moment";
import { SnackConfirmComponent } from '../../../../shared/snack-confirm/snack-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Recaudacion } from '../../../../models/Recaudacion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';
import pdfFonts from "pdfmake/build/vfs_fonts";
import { layouts } from 'chart.js';
PdfMakeWrapper.setFonts(pdfFonts);

interface DataRecaudacion {
  codigoArticulo: string;
  nombreArticulo: string;
  nombreMarca: string;
  cantidadVendida: number;
  stockArticulo: number;
  recaudacion: number;
}
type TableRow = [string, string, string, number, number, number]
@Component({
  selector: 'app-recaudaciones',
  templateUrl: './recaudaciones.component.html',
  styleUrls: ['./recaudaciones.component.scss']
})
export class RecaudacionesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Recaudacion>;
  displayedColumns: string[] = ['codigo',
    'nombre',
    'marca',
    'cantidad',
    'stock',
    'recaudacion'
  ];
  recaudaciones: DataRecaudacion[];
  reporteFechas: ReporteFechas = new ReporteFechas();
  startDate: string;
  endDate: string;

  constructor(
    private readonly reporteService: ReporteService,
    private readonly snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.cargarDataInicial();
  }

  fechaInicial(): string {
    const date = new Date();
    this.startDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear() - 1}`;
    return this.startDate;
  }

  cargarDataInicial() {
    this.reporteFechas.fechaInicial = this.fechaInicial();
    this.reporteFechas.fechaFinal = this.endDate = moment().format('YYYY-MM-DD');
    this.reporteService.getRecaudacionByArticle(this.reporteFechas).subscribe(dataset => {
      this.recaudaciones = dataset
      this.establecerDatasource(this.recaudaciones);


    });
  }

  establecerDatasource(recaudaciones: Recaudacion[]) {
    this.dataSource = new MatTableDataSource(recaudaciones);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filtrarFechas(): void {
    if (this.startDate === undefined || this.endDate === undefined) {
      this.openSnackBar("se debe ingresar una fecha inicial y una fecha final");
      return;

    }
    if (this.startDate > this.endDate) {
      this.openSnackBar("La fecha inicial no puede ser mayor a la fecha final");
      return;

    }
    this.reporteFechas.fechaInicial = this.startDate;
    this.reporteFechas.fechaFinal = this.endDate;
    this.reporteService.getRecaudacionByArticle(this.reporteFechas).subscribe(dataset => {
      if (dataset.length === 0) {
        this.openSnackBar("No existen registros en el periodo de tiempo cargado")
      }
      this.recaudaciones = dataset;
      this.establecerDatasource(this.recaudaciones)
    });
  }
  reset(): void {
    this.cargarDataInicial();
  }
  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }

  generarPDF() {
    PdfMakeWrapper.setFonts(pdfFonts);
    const pdf = new PdfMakeWrapper();
    pdf.add([
      new Txt('fecha Emision: ' + moment().format('DD-MM-YYYY')).alignment('right').bold().end,
      new Txt('Reporte de recaudaciones por articulo').bold().alignment('center').fontSize(20).margin(20).end,
      this.createTable(this.recaudaciones),
      new Txt([
        new Txt('Desde: ').end,
        new Txt(this.startDate + "    ").bold().alignment('left').fontSize(13).end,
        new Txt('Hasta: ').end,
        new Txt(this.endDate).bold().alignment('right').fontSize(13).end
      ]).margin([0, 20]).alignment('justify').end]);
    pdf.create().open();
  }

  createTable(data: DataRecaudacion[]): ITable {
    return new Table([
      [new Txt('Codigo').bold().fontSize(14).alignment('left').end,
      new Txt('Nombre').bold().fontSize(14).alignment('left').end,
      new Txt('Marca').bold().fontSize(14).alignment('left').end,
      new Txt('Cantidad vendida').bold().fontSize(14).alignment('left').end,
      new Txt('Stock').bold().fontSize(14).alignment('left').end,
      new Txt('Recaudacion').bold().fontSize(14).alignment('left').end],
      ...this.extractData(data)
    ]).widths(['*', '*', '*', '*', '*', '*'])
      .layout({
        fillColor: (rowIndex) => {
          if (rowIndex === 0) {
            return '#ffc107';
          }

          if (rowIndex % 2 === 1) {
            return '#ffffff';
          }
          else {
            return '#D5D5D5'
          }
        }
      }).fontSize(12).end;
  }

  extractData(data: DataRecaudacion[]): any {
    return data.map(row =>
      [row.codigoArticulo, row.nombreArticulo, row.nombreMarca,
      row.cantidadVendida, row.stockArticulo, '$' + row.recaudacion]);
  }

}
