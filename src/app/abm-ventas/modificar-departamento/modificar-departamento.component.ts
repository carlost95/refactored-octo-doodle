import { AbmVentasService } from "../../service/abm-ventas.service";
import { Departamento } from "../../modelo/Departamento";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { __param } from "tslib";

@Component({
  selector: "app-modificar-departamento",
  templateUrl: "./modificar-departamento.component.html",
  styleUrls: ["./modificar-departamento.component.css"]
})
export class ModificarDepartamentoComponent implements OnInit {
  departamento: Departamento = new Departamento();

  constructor(private service: AbmVentasService, private id: ActivatedRoute) {}

  ngOnInit() {
    let id: number;
    this.id.params.subscribe(data => (id = data["id"]));
    console.log("se muestra -->" + id);
    this.service.listarDepartamentoId(id).subscribe(data => {
      this.departamento = data.data;
    });
  }

  actualizarDepartamento(departamento: Departamento) {
    this.service.actualizarDepartamento(departamento).subscribe(data => {
      this.departamento = data;
      alert("se actualizo con EXITO");
      window.history.back();
    });
  }
  cancelar() {
    window.history.back();
  }
}
