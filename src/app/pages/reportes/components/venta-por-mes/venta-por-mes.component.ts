import { Component, OnInit } from '@angular/core';
import { months } from '@app/pages/reportes/domain/util';
import Chart from 'chart.js/auto';
import { ReporteService } from '@service/reporte.service';
import _ from 'lodash';

@Component({
  selector: 'app-venta-por-mes',
  templateUrl: './venta-por-mes.component.html',
  styleUrls: ['./venta-por-mes.component.scss']
})
export class VentaPorMesComponent implements OnInit {

  chart: Chart;
  constructor(private readonly reporteService: ReporteService) { }

  ngOnInit(): void {
    this.reporteService.obtenerVentasPorMes().subscribe(dataset => {
      this.createChart(dataset);
    });
  }

  createChart(dataset: any[]): void {
    const meses = dataset.map(dataset => Number(dataset.mes));
    const maxMonth = _.max(meses);
    const labels = months({ count: maxMonth });
    const ventas = [];
    for (let i = 1; i <= maxMonth; i++) {
      const venta = dataset.find(v => v.mes === i);
      ventas.push(venta?.ventas || 0);
    }
    const data = {
      labels,
      datasets: [{
        label: 'Ventas por mes',
        data: ventas,
        backgroundColor: [
          'rgba(255, 99, 132, .8)',
          'rgba(255, 159, 64, .8)',
          'rgba(255, 205, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(153, 102, 255, 0.8)',
          'rgba(201, 203, 207, 0.8)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };
    const config = {
      type: 'bar',
      data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };
    this.chart = new Chart('venta-por-mes', config);
  }

}
