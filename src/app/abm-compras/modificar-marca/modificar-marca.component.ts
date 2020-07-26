import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { Marca } from "./../../modelo/Marca";
import { AbmComprasService } from "./../../service/abm-compras.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-modificar-marca",
  templateUrl: "./modificar-marca.component.html",
  styleUrls: ["./modificar-marca.component.css"]
})
export class ModificarMarcaComponent implements OnInit {
  marca: Marca = new Marca();
  constructor(
    private serviceAbmCompra: AbmComprasService,
    private router: Router,
    private id: ActivatedRoute
  ) {}

  ngOnInit() {
    let id: number;
    this.id.params.subscribe(data => (id = data["id"]));
    console.log("ID DE MARCA: " + id);
    this.serviceAbmCompra.listarMarcaId(id).subscribe(resp => {
      this.marca = resp.data;
    });
  }
  actualizarMarca(marca: Marca) {
    marca.nombre = marca.nombre.toUpperCase();
    marca.abreviatura = marca.abreviatura.toUpperCase();

    this.serviceAbmCompra.actualizarMarca(marca).subscribe(data => {
      this.marca = data;
      alert("SE ACTUALIZO MARCA--> " + marca.nombre);
      window.history.back();
    });
  }

  cancelar() {
    window.history.back();
  }
}
