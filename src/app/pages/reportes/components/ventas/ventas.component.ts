import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ReporteService } from '@service/reporte.service';
import _ from 'lodash';
import { ReporteFechas } from '../../../../models/ReporteFechas';
import moment from "moment";
import { SnackConfirmComponent } from '../../../../shared/snack-confirm/snack-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  chart: Chart;
  reporteFechas: ReporteFechas = new ReporteFechas();
  startDate: string;
  endDate: string;

  constructor(
    private readonly reporteService: ReporteService,
    private readonly snackBar: MatSnackBar
  ) { }

  fechaInicial(): string {
    const date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear() - 1}`;
  }


  ngOnInit(): void {
    this.cargarDataInicial();
  }

  cargarDataInicial() {
    this.reporteFechas.fechaInicial = this.fechaInicial();
    this.reporteFechas.fechaFinal = moment().format('YYYY-MM-DD');
    this.reporteService.getVentasPorMes(this.reporteFechas).subscribe(dataset => {
      this.createChart(dataset);
    });
  }
  filtrarFechas() {
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
    this.reporteService.getVentasPorMes(this.reporteFechas).subscribe(dataset => {
      this.chart.destroy();
      if (dataset.length === 0) {
        this.openSnackBar("No se registraron ventas en el periodo de fecha CARGADOS")
      }
      this.createChart(dataset);
    });
  }
  reset(): void {
    this.chart.destroy();
    this.cargarDataInicial();
  }

  createChart(dataset: any[]): void {
    const labels = dataset.map(dataset => String(dataset.fecha));
    const ventas = dataset.map(dataset => Number(dataset.acciones));
    const data = {
      labels,
      datasets: [{
        label: 'Ventas por mes',
        data: ventas,
        backgroundColor: "rgba(75, 192, 192, 0.8)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1
      }]
    };
    const config = {
      type: 'bar',
      data,
      responsive: true,
      options: {
        scales: {
          y: {
            beginAtZero: true
          },
          x: {
            beginAtZero: true
          }
        }
      },
    };
    this.chart = new Chart('ventas', config);
  }
  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }

}
