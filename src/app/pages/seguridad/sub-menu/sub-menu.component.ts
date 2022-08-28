import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
})
export class SubMenuComponent implements OnInit {
  ITEMS = [
    {
      ruta: 'list-users',
      label: 'usuarios',
      icon: 'usuario',
    },
  ];

  constructor() {}

  // tslint:disable-next-line:typedef
  ngOnInit() {}
}
