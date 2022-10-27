import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
// import { months } from './domain/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent implements OnInit {

  chart: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.createChart();
  }

  // createChart() {
  //   const labels = months({count: 7});
  //   const data = {
  //     labels,
  //     datasets: [{
  //       label: 'My First Dataset',
  //       data: [65, 59, 80, 81, 56, 55, 40],
  //       backgroundColor: [
  //         'rgba(255, 99, 132, 0.2)',
  //         'rgba(255, 159, 64, 0.2)',
  //         'rgba(255, 205, 86, 0.2)',
  //         'rgba(75, 192, 192, 0.2)',
  //         'rgba(54, 162, 235, 0.2)',
  //         'rgba(153, 102, 255, 0.2)',
  //         'rgba(201, 203, 207, 0.2)'
  //       ],
  //       borderColor: [
  //         'rgb(255, 99, 132)',
  //         'rgb(255, 159, 64)',
  //         'rgb(255, 205, 86)',
  //         'rgb(75, 192, 192)',
  //         'rgb(54, 162, 235)',
  //         'rgb(153, 102, 255)',
  //         'rgb(201, 203, 207)'
  //       ],
  //       borderWidth: 1
  //     }]
  //   };
  //   const config = {
  //     type: 'bar',
  //     data,
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     },
  //   };
  //   this.chart = new Chart('MyChart', config);
  // }

  validaMenu(): boolean {
    if (
      this.router.url.includes('/reporte-venta') ||
      this.router.url.includes('/reporte-remito') ||
      this.router.url.includes('/reporte-pedido') ||
      this.router.url.includes('/reporte-recaudacion')
    ) {
      return false;
    } else {
      return true;
    }
  }
}
