import { SubRubroDTO } from './../../modelo/SubRubroDTO';
import { SubRubro } from './../../modelo/SubRubro';
import { ActivatedRoute } from "@angular/router";
import { AbmComprasService } from "src/app/service/abm-compras.service";
import { Rubro } from "./../../modelo/Rubro";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-modificar-sub-rubro",
  templateUrl: "./modificar-sub-rubro.component.html",
  styleUrls: ["./modificar-sub-rubro.component.css"]
})
export class ModificarSubRubroComponent implements OnInit {
  subRubro: SubRubro = new SubRubro();
  subRubroDTO: SubRubroDTO = new SubRubroDTO();

  rubrosFilter: Rubro[] = null;
  rubros: Rubro[] = null;
  rubroSelected: Rubro;
  nombreRubro: string = null;
  idRubro: number = null;
  rubro: Rubro;

  constructor(
    private serviceAbmCompra: AbmComprasService,
    private id: ActivatedRoute
  ) {}

  ngOnInit() {
    this.serviceAbmCompra.listarRubrosHabilitados().subscribe(data => {
      this.rubros = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      // console.log("this.departamentos", this.departamentos);
      let id: number;
      this.id.params.subscribe(data => (id = data["id"]));
      console.log("se muestra -->" + id);

      this.serviceAbmCompra.listarSubRubroId(id).subscribe(data => {
        // this.subRubro = data.data;

        this.serviceAbmCompra
          .listarRubroId(this.subRubro.rubroId.id)
          .subscribe(resp => {
            this.rubroSelected = resp.data;
            console.log("this.rubroSelected======>",this.rubroSelected);
          });
      });
    });
  }
  volverAtras() {
    window.history.back();
  }
  // -----------------
  actualizarSubRubro(subRubro: SubRubro) {

    this.subRubroDTO.nombre = subRubro.nombre;
    this.subRubroDTO.id = subRubro.id;
    this.subRubroDTO.descripcion = subRubro.descripcion;
    this.subRubroDTO.habilitacion = subRubro.habilitacion;
    this.subRubroDTO.rubroId = subRubro.rubroId.id;
    console.log(this.subRubroDTO);

    this.serviceAbmCompra.actualizarSubRubro(this.subRubroDTO).subscribe(data => {
      this.subRubroDTO = data;
      alert("SE ACTUALIZO EL SUB RUBRO " + this.subRubroDTO.nombre);
      window.history.back();
    });
  }

  listarRubros(filterVal: any) {
    if (filterVal == "0") this.rubrosFilter = this.rubros;
    else
      this.rubrosFilter = this.rubros.filter(
        item => item.nombre == filterVal
      );
  }
}
