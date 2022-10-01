import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-menu-compras',
  templateUrl: './sub-menu-compras.component.html',
  styleUrls: ['./sub-menu-compras.component.css'],
})
export class SubMenuComprasComponent implements OnInit {
  isLogged = false;
  ITEMS = [
    {
      ruta: 'listar-banco',
      label: 'bancos',
      icon: 'banco',
    },
    {
      ruta: 'listar-marca',
      label: 'marcas',
      icon: 'marca',
    },
    {
      ruta: 'listar-unidad-medida',
      label: 'unid. medida',
      icon: 'unidadMedida',
    },
    {
      ruta: 'listar-rubro',
      label: 'rubros',
      icon: 'rubro',
    },
    {
      ruta: 'listar-sub-rubro',
      label: 'sub-rubros',
      icon: 'subRubro',
    },
    {
      ruta: 'listar-ajuste',
      label: 'ajustes',
      icon: 'ajuste',
    },
    {
      ruta: 'listar-empresa',
      label: 'empresas',
      icon: 'empresa'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}
