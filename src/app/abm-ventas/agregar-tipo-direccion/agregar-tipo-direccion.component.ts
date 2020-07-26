import { TipoDireccion } from "../../modelo/tipoDireccion";
import { VentasService } from "src/app/service/ventas.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-agregar-tipo-direccion",
  templateUrl: "./agregar-tipo-direccion.component.html",
  styleUrls: ["./agregar-tipo-direccion.component.css"]
})
export class AgregarTipoDireccionComponent implements OnInit {
  tipoDireccion: TipoDireccion = new TipoDireccion();
  response: Response;

  constructor(private service: VentasService) {}

  ngOnInit() {}
  guardarTipoDireccion(tipoDireccion: TipoDireccion) {
    this.tipoDireccion.habilitado = 1;
    this.tipoDireccion.id = null;
    this.service.guardarTipoDireccion(this.tipoDireccion).subscribe(data => {
      this.tipoDireccion = data;
      alert("se guardo un nuevo tipo de Direccion");
      window.history.back();
    });
  }
  cancelar() {
    window.history.back();
  }
}
