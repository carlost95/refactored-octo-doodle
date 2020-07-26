import { AbmComprasService } from "./../../service/abm-compras.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Banco } from "./../../modelo/Banco";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-modificar-banco",
  templateUrl: "./modificar-banco.component.html",
  styleUrls: ["./modificar-banco.component.css"]
})
export class ModificarBancoComponent implements OnInit {
  banco: Banco = new Banco();
  constructor(
    private router: Router,
    private id: ActivatedRoute,
    private abmComprasService: AbmComprasService
  ) {}

  ngOnInit() {
    let id: number;
    this.id.params.subscribe(data => (id = data["id"]));
    console.log("ID DE BANCO: " + id);
    this.abmComprasService.listarBancoId(id).subscribe(resp => {
      this.banco = resp.data;
    });
  }
  actualizarBanco(banco: Banco) {
    banco.nombre = banco.nombre.toUpperCase();
    banco.abreviatura = banco.abreviatura.toUpperCase();

    this.abmComprasService.actualizarBanco(banco).subscribe(data => {
      this.banco = data;
      alert("se actualizo banco " + banco.nombre);
      window.history.back();
    });
  }

  cancelar() {
    window.history.back();
  }
}
