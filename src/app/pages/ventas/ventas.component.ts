import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ventas-component',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  constructor(private router: Router) {
  }

  // tslint:disable-next-line:typedef
  validaMenu() {
    if (
      this.router.url.includes('/clientes') ||
      this.router.url.includes('/agregar-cliente') ||
      this.router.url.includes('/modificar-cliente') ||
      this.router.url.includes('/direcciones') ||
      this.router.url.includes('/agregar-direccion')
    ) {
      return false;
    } else {
      return true;
    }
  }
}
