import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nueva-venta',
  templateUrl: './nueva-venta.component.html',
  styleUrls: ['./nueva-venta.component.scss']
})
export class NuevaVentaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('ingreso');
  }

}
