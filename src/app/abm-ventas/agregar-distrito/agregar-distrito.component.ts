import { AbmVentasService } from '../../service/abm-ventas.service';
import { Router } from "@angular/router";
import { VentasService } from "src/app/service/ventas.service";
import { Departamento } from "../../modelo/Departamento";
import { Distrito } from "../../modelo/Distrito";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-agregar-distrito",
  templateUrl: "./agregar-distrito.component.html",
  styleUrls: ["./agregar-distrito.component.css"]
})
export class AgregarDistritoComponent implements OnInit {
  distrito: Distrito = new Distrito();
  departamentos: Departamento[] = null;
  departamentosFilter: Departamento[] = null;
  idDepto: number = 1;
  nombreDepto: string = null;

  constructor(private service: AbmVentasService, private router: Router) {}

  ngOnInit() {
    this.service.listarDepartamentosHabilitados().subscribe(data => {
      this.departamentos = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.departamentosFilter = this.departamentos;
    });
  }
  volverAtras() {
    window.history.back();
  }
  nuevoDistrito(distrito: Distrito) {
    this.distrito.idDepartamento = 1;

    this.departamentos.forEach(departamento => {
      if (departamento.nombre == this.nombreDepto) {
        this.distrito.idDepartamento = departamento.id;
      }
    });

    for (var i = 0; i < this.departamentos.length; i++) {
      if (this.departamentos[i].nombre == this.nombreDepto) {
        this.distrito.idDepartamento = this.departamentos[i].id;
      }
    }
    this.distrito.habilitacion = 1;
    this.service.guardarDistrito(this.distrito).subscribe(data => {
      alert("se guardo un nuevo distrto");
      window.history.back();
    });
  }

  listarDepartamentos(filterVal: any) {
    if (filterVal == "0") this.departamentosFilter = this.departamentos;
    else
      this.departamentosFilter = this.departamentos.filter(
        item => item.nombre == filterVal
      );
  }
}
