import { Banco } from "./../../modelo/Banco";
import { AbmComprasService } from "./../../service/abm-compras.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-agregar-banco",
  templateUrl: "./agregar-banco.component.html",
  styleUrls: ["./agregar-banco.component.css"]
})
export class AgregarBancoComponent implements OnInit {
  banco: Banco = new Banco();

  constructor(private service: AbmComprasService) {}

  ngOnInit() {}

  guardarBanco(banco: Banco) {
    console.log(banco);

    this.banco.habilitado = null;
    this.banco.id = null;
    this.banco.nombre = this.banco.nombre.toUpperCase();
    this.banco.abreviatura = this.banco.abreviatura.toUpperCase();

    this.service.guardarBanco(this.banco).subscribe(data => {
      this.banco = data;
      alert("se guardo un nuevo banco");
      window.history.back();
    });
  }
  cancelar() {
    window.history.back();
  }
}
