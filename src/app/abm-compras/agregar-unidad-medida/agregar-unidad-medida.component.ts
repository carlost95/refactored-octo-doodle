import { AbmComprasService } from './../../service/abm-compras.service';
import { UnidadMedida } from './../../modelo/UnidadMedida';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-unidad-medida',
  templateUrl: './agregar-unidad-medida.component.html',
  styleUrls: ['./agregar-unidad-medida.component.css']
})
export class AgregarUnidadMedidaComponent implements OnInit {

 unidadMedida: UnidadMedida = new UnidadMedida();
  constructor(private serviceAbmCompra: AbmComprasService) { }

  ngOnInit() {
  }
  guardarUnidadMedida(unidadMedida: UnidadMedida) {
    this.unidadMedida.nombre = this.unidadMedida.nombre.toUpperCase();
    this.unidadMedida.abreviatura = this.unidadMedida.abreviatura.toUpperCase();


    this.serviceAbmCompra.guardarUnidadMedida(this.unidadMedida).subscribe(data => {
      this.unidadMedida = data;
      alert("SE AGREGO UNA NUEVA UNIDAD DE MEDIDA");
      window.history.back();
    });
  }
  cancelar() {
    window.history.back();
  }

}
