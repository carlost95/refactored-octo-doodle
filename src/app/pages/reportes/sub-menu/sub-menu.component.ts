import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
  ITEMS = [
    {
      ruta: 'reporte-venta',
      label: 'reporte de ventas',
      icon: 'reporte_venta',
    },
    {
      ruta: 'reporte-remito',
      label: 'reporte de entregas realizadas',
      icon: 'reporte_remito',
    },
    {
      ruta: 'reporte-pedido',
      label: 'reporte pedidos recibidos',
      icon: 'reporte_pedido',
    },
    {
      ruta: 'reporte-recaudacion',
      label: 'recaudaciones por Articulo',
      icon: 'reporte_recaudacion',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
