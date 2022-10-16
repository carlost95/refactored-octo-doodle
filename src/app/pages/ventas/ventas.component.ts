import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas-component',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  constructor(private router: Router) {
  }

  validaMenu(): boolean {
    if (
      this.router.url.includes('/clientes') ||
      this.router.url.includes('/direcciones') ||
      this.router.url.includes('/listar-venta') ||
      this.router.url.includes('/listar-remitos') ||
      this.router.url.includes('/consultar-remito') ||
      this.router.url.includes('/modificar-cliente') ||
      this.router.url.includes('/agregar-direccion') ||
      this.router.url.includes('/agregar-remito') ||
      this.router.url.includes('/agregar-cliente') ||
      this.router.url.includes('/agregar-venta') ||
      this.router.url.includes('/consultar-venta')
    ) {
      return false;
    } else {
      return true;
      console.log('entre');

    }
  }
}
