import { AbmVentasService } from '../../service/abm-ventas.service';
import { Distrito } from "../../modelo/Distrito";
import { VentasService } from "src/app/service/ventas.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-listar-distritos",
  templateUrl: "./listar-distritos.component.html",
  styleUrls: ["./listar-distritos.component.css"]
})
export class ListarDistritosComponent implements OnInit {
  busquedaNombre: string = null;
  busqueda: string = null;
  distritos: Distrito[] = null;
  distritosFilter: Distrito[] = null;

  constructor(private router: Router, private service: AbmVentasService) {}

  ngOnInit() {
    this.service.listarDistritosHabilitados().subscribe(data => {
      this.distritos = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.distritosFilter = this.distritos;
    });
  }

  filtrarDistritoAbreviatura(event: any) {
    console.log("filtra nombre");

    if (this.busqueda !== null) {
      this.distritosFilter = this.distritos.filter(item => {
        if (
          item.abreviatura.toUpperCase().includes(this.busqueda.toUpperCase())
        ) {
          return item;
        }
      });
    } else {
      this.distritosFilter = this.distritos;
    }
  }

  filtrarDistritoNombre(event: any) {
    console.log("filtra nombre");

    if (this.busquedaNombre !== null) {
      this.distritosFilter = this.distritos.filter(item => {
        if (
          item.nombre.toUpperCase().includes(this.busquedaNombre.toUpperCase())
        ) {
          return item;
        }
      });
    } else {
      this.distritosFilter = this.distritos;
    }
  }
  modificarDistrito(distrito: Distrito) {
    this.router.navigate(["/abm-ventas/modificar-distrito/" + distrito.id]);
  }

  inhabilitarDistrito(distrito: Distrito) {
    let resultado: boolean;
    resultado = confirm("¿DESEA ELIMINAR DISTRITO?");
    if (resultado === true) {
      this.service.desabilitarDistrito(distrito.id).subscribe(data => {
      window.location.reload();
    });
    }
  }
  backPage(){
    window.history.back();
  }
}
