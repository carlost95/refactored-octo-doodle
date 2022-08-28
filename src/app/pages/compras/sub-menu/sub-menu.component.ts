import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
})
export class SubMenuComponent implements OnInit {
  ITEMS = [
    {
      ruta: 'listar-proveedor',
      label: 'proveedores',
      icon: 'proveedor',
    },
    {
      ruta: 'listar-articulos',
      label: 'articulos',
      icon: 'articulo',
    },
    {
      ruta: 'listar-pedido',
      label: 'pedidos',
      icon: 'pedido',
    },
  ];
  constructor() {}

  ngOnInit() {}
}
