import { Router } from "@angular/router";
import { AbmComprasService } from "./../../service/abm-compras.service";
import { FormaPago } from "./../../modelo/FormaPago";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-listar-forma-pago",
  templateUrl: "./listar-forma-pago.component.html",
  styleUrls: ["./listar-forma-pago.component.css"]
})
export class ListarFormaPagoComponent implements OnInit {
  formaPago: FormaPago = null;
  formaPagos: FormaPago[] = null;
  formaPagosFilter: FormaPago[] = null;
  busquedaNombre: string = null;
  busqueda: string = null;

  constructor(
    private serviceAbmCompra: AbmComprasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.serviceAbmCompra.listarFormaPagoTodos().subscribe(data => {
      this.formaPagos = data.data;
      this.formaPagosFilter = data.data;
    });
  }
  modificarFormaPago(formaPago: FormaPago) {
    this.router.navigate(["abm-compras/modificar-forma-pago/" + formaPago.id]);
  }
  deshabilitarFormaPago(formaPago: FormaPago) {
    let resultado: boolean;
    resultado = confirm("¿DESEA DESHABILITAR ESTA FORMA DE PAGO?");
    if (resultado === true) {
      this.serviceAbmCompra
        .desabilitarFormaPago(formaPago.id)
        .subscribe(data => {
          window.location.reload();
        });
    }
  }
  filtrarBancoNombre(event: any) {
    if (this.busqueda !== null) {
      this.formaPagosFilter = this.formaPagos.filter(item => {
        if (item.nombre.toUpperCase().includes(this.busqueda.toUpperCase())) {
          return item;
        }
      });
    } else {
      this.formaPagosFilter = this.formaPagos;
    }
  }

  filtrarBancoAbreviatura(event: any) {
    if (this.busquedaNombre !== null) {
      this.formaPagosFilter = this.formaPagos.filter(item => {
        if (
          item.descripcion
            .toUpperCase()
            .includes(this.busquedaNombre.toUpperCase())
        ) {
          return item;
        }
      });
    } else {
      this.formaPagosFilter = this.formaPagos;
    }
  }
  backPage() {
    window.history.back();
  }
}
