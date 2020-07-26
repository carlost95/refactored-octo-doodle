import { AbmVentasService } from './../../service/abm-ventas.service';
// import { VentasService } from "../../service/ventas.service";
import { Component, OnInit, Input } from "@angular/core";
import { Departamento } from "../../modelo/Departamento";
import { Router } from "@angular/router";

@Component({
  selector: "app-listar-departamento",
  templateUrl: "./listar-departamento.component.html",
  styleUrls: ["./listar-departamento.component.css"]
})
export class ListarDepartamentoComponent implements OnInit {
  departamento: Departamento = null;
  departamentos: Departamento[] = null;
  departamentosFilter: Departamento[] = null;
  busquedaNombre: string = null;
  busqueda: string = null;

  constructor(private service: AbmVentasService, private router: Router) {}

  ngOnInit() {
    this.service.listarDepartamentosHabilitados().subscribe(data => {
      this.departamentos = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.departamentosFilter = this.departamentos;
    });
  }

  filtrarDepartamentoAbreviatura(event: any) {
    console.log("filtra nombre");

    if (this.busqueda !== null) {
      this.departamentosFilter = this.departamentos.filter(item => {
        if (
          item.abreviatura.toUpperCase().includes(this.busqueda.toUpperCase())
        ) {
          return item;
        }
      });
    } else {
      this.departamentosFilter = this.departamentos;
    }
  }
  filtrarDepartamentoNombre(event: any) {
    console.log("filtra nombre");

    if (this.busquedaNombre !== null) {
      this.departamentosFilter = this.departamentos.filter(item => {
        if (
          item.nombre.toUpperCase().includes(this.busquedaNombre.toUpperCase())
        ) {
          return item;
        }
      });
    } else {
      this.departamentosFilter = this.departamentos;
    }
  }
  modificarDepartamento(departamento: Departamento) {
    this.router.navigate(["/abm-ventas/modificar-departamento/" + departamento.id]);
  }

  deshabilitarDepartamento(departamento: Departamento) {
    let resultado: boolean;
    resultado = confirm("¿DESEA ELIMINAR DEPARTAMENTO?");
    if (resultado === true) {
      this.service.deshabilitarDepartamento(departamento.id)
    .subscribe(data => {
      window.location.reload();
    });
    }
  }
  backPage(){
    window.history.back();
  }
}
