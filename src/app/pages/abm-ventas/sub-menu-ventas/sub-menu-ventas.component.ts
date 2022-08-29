import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-menu-ventas',
  templateUrl: './sub-menu-ventas.component.html',
  styleUrls: ['./sub-menu-ventas.component.css'],
})
export class SubMenuVentasComponent implements OnInit {
  ITEMS = [
    {
      ruta: 'distritos',
      label: 'distritos',
      icon: 'distrito',
    },
    {
      ruta: 'departamentos',
      label: 'departamentos',
      icon: 'departamento',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
