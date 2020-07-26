import { AbmComprasService } from './../../service/abm-compras.service';
import { FormaPago } from './../../modelo/FormaPago';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-forma-pago',
  templateUrl: './agregar-forma-pago.component.html',
  styleUrls: ['./agregar-forma-pago.component.css']
})
export class AgregarFormaPagoComponent implements OnInit {
  formaPago: FormaPago = new FormaPago();

  constructor(private service: AbmComprasService) {}

  ngOnInit() {}

  guardarFormaPago(formaPago: FormaPago) {
    console.log(formaPago);

    this.formaPago.habilitacion = null;
    this.formaPago.id = null;
    this.formaPago.nombre = this.formaPago.nombre.toUpperCase();
    this.formaPago.descripcion = this.formaPago.descripcion.toUpperCase();

    this.service.guardarFormaPago(this.formaPago).subscribe(data => {
      this.formaPago = data;
      alert("SE GENERO UNA NUEVA FORMA DE PAGO");
      window.history.back();
    });
  }
  cancelar() {
    window.history.back();
  }
}
