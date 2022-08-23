import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
})
export class SubMenuComponent implements OnInit {
  ITEMS = [
    {
      ruta: 'clientes',
      label: 'clientes',
      icon: 'cliente',
    },
    {
      ruta: 'listar-venta',
      label: 'ventas',
      icon: 'venta',
    },
    {
      ruta: 'listar-remitos',
      label: 'remitos',
      icon: 'remito',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
