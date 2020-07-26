import { SubRubroDTO } from './../../modelo/SubRubroDTO';
import { Rubro } from './../../modelo/Rubro';
import { Router } from "@angular/router";
import { AbmComprasService } from "./../../service/abm-compras.service";
import { SubRubro } from "./../../modelo/SubRubro";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-listar-sub-rubro",
  templateUrl: "./listar-sub-rubro.component.html",
  styleUrls: ["./listar-sub-rubro.component.css"]
})
export class ListarSubRubroComponent implements OnInit {
  subRubro: SubRubro = null;
  subRubros: SubRubro[] = null;
  subRubrosFilter: SubRubro[] = null;
  nombreRubros: string[]= null;
  busquedaNombre: string = null;
  busqueda: string = null;
  constructor(
    private serviceAbmCompra: AbmComprasService,
    private router: Router
  ) {}

   ngOnInit()  {
    this.serviceAbmCompra.listarSubRubrosTodos().subscribe(data => {
      console.log(data.data);

      this.subRubros = data.data;

      this.subRubrosFilter = data.data;
      let rubro = this.subRubros[0].rubroId;
      console.log(rubro);
    });


  }
  modificarSubRubro(subRubro: SubRubro) {
    this.router.navigate(["abm-compras/modificar-sub-rubro/" + subRubro.id]);
  }
  deshabilitarSubRubro(subRubro: SubRubro) {
    let resultado: boolean;
    resultado = confirm("¿DESEA DESHABILITAR ESTE SUB-RUBRO?");
    if (resultado === true) {
      this.serviceAbmCompra.desabilitarSubRubro(subRubro.id).subscribe(data => {
        window.location.reload();
      });
    }
  }
  filtrarSubRubroNombre(event: any) {
    if (this.busqueda !== null) {
      this.subRubrosFilter = this.subRubros.filter(item => {
        if (item.nombre.toUpperCase().includes(this.busqueda.toUpperCase())) {
          return item;
        }
      });
    } else {
      this.subRubrosFilter = this.subRubros;
    }
  }

  backPage() {
    window.history.back();
  }
}
