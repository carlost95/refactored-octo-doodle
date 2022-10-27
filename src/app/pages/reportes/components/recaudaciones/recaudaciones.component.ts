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
import { BuscadorService } from '../../../../shared/helpers/buscador.service';
import { MatTableDataSource } from '@angular/material/table';


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
  recaudaciones: Recaudacion[];
  reporteFechas: ReporteFechas = new ReporteFechas();
  startDate: string;
  endDate: string;

  constructor(
    private readonly reporteService: ReporteService,
    private readonly snackBar: MatSnackBar,
    private readonly buscadorService: BuscadorService,

  ) { }

  ngOnInit(): void {
    this.cargarDataInicial();
  }

  fechaInicial(): string {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear() - 1}`;
  }

  cargarDataInicial() {
    this.reporteFechas.fechaInicial = this.fechaInicial();
    this.reporteFechas.fechaFinal = moment().format('YYYY-MM-DD');
    this.reporteService.getRecaudacionByArticle(this.reporteFechas).subscribe(dataset => {
      this.recaudaciones = dataset
      this.establecerDatasource(this.recaudaciones);


    });
  }

  establecerDatasource(recaudaciones: Recaudacion[]): void {
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
    console.log("se debe generar el PDF");

  }

}
