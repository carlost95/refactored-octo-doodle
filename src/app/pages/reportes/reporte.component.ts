import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent {

  constructor(private router: Router) { }

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
