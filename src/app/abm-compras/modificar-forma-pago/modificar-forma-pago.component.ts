import { FormaPago } from "./../../modelo/FormaPago";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AbmComprasService } from "./../../service/abm-compras.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-modificar-forma-pago",
  templateUrl: "./modificar-forma-pago.component.html",
  styleUrls: ["./modificar-forma-pago.component.css"]
})
export class ModificarFormaPagoComponent implements OnInit {
  formaPago: FormaPago = new FormaPago();

  constructor(
    private serviceAbmCompra: AbmComprasService,
    private router: Router,
    private id: ActivatedRoute
  ) {}
  ngOnInit() {
    let id: number;
    this.id.params.subscribe(data => (id = data["id"]));
    this.serviceAbmCompra.listarformaPagoId(id).subscribe(resp => {
      this.formaPago = resp.data;
    });
  }
  actualizarFormaPago(formaPago: FormaPago) {
    formaPago.nombre = formaPago.nombre.toUpperCase();
    formaPago.descripcion = formaPago.descripcion.toUpperCase();

    this.serviceAbmCompra.actualizarFormaPago(formaPago).subscribe(data => {
      this.formaPago = data;
      alert("SE ACTUALIZO FORMA DE PAGO--> " + formaPago.nombre);
      window.history.back();
    });
  }

  cancelar() {
    window.history.back();
  }
}
