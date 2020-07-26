import { AbmVentasService } from "./../../service/abm-ventas.service";
import { Departamento } from "./../../modelo/Departamento";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-agregar-departamento",
  templateUrl: "./agregar-departamento.component.html",
  styleUrls: ["./agregar-departamento.component.css"]
})
export class AgregarDepartamentoComponent implements OnInit {
  departamento: Departamento = new Departamento();
  response: Response;

  constructor(private service: AbmVentasService) {}

  ngOnInit() {}
  guardarDepartamento(departamento: Departamento) {
    console.log(departamento);
    this.departamento.habilitado = 1;
    this.departamento.id = null;
    this.service.guardarDepartamento(this.departamento).subscribe(data => {
      this.departamento = data;
      alert("se guardo un nuevo departamento");
      window.history.back();
    });
  }
  cancelar() {
    window.history.back();
  }
}
