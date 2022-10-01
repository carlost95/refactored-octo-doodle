import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.component.html',
  styleUrls: ['./agregar-venta.component.scss']
})
export class AgregarVentaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('ingreso');
  }

}
