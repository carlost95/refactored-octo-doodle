import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { AbmComprasService } from "./../../service/abm-compras.service";
import { Rubro } from "./../../modelo/Rubro";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-modificar-rubro",
  templateUrl: "./modificar-rubro.component.html",
  styleUrls: ["./modificar-rubro.component.css"]
})
export class ModificarRubroComponent implements OnInit {
  rubro: Rubro = new Rubro();
  constructor(
    private serviceAbmCompra: AbmComprasService,
    private router: Router,
    private id: ActivatedRoute
  ) {}
  ngOnInit() {
    let id: number;
    this.id.params.subscribe(data => (id = data["id"]));
    this.serviceAbmCompra.listarRubroId(id).subscribe(resp => {
      this.rubro = resp.data;
    });
  }
  actualizarRubro(rubro: Rubro) {
    rubro.nombre = rubro.nombre.toUpperCase();
    rubro.descripcion = rubro.descripcion.toUpperCase();

    this.serviceAbmCompra.actualizarRubro(rubro).subscribe(data => {
      this.rubro = data;
      alert("SE ACTUALIZO FORMA DE PAGO--> " + rubro.nombre);
      window.history.back();
    });
  }

  cancelar() {
    window.history.back();
  }
}
