import { AbmVentasService } from "../../service/abm-ventas.service";
import { Departamento } from "../../modelo/Departamento";
import { ActivatedRoute } from "@angular/router";
import { VentasService } from "src/app/service/ventas.service";
import { Distrito } from "../../modelo/Distrito";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-modificar-distrito",
  templateUrl: "./modificar-distrito.component.html",
  styleUrls: ["./modificar-distrito.component.css"]
})
export class ModificarDistritoComponent implements OnInit {
  distrito: Distrito = new Distrito();
  departamentosFilter: Departamento[] = null;
  departamentos: Departamento[] = null;
  departamentoSelected: Departamento;
  nombreDepto: string = null;
  idDepartamento: number = null;
  departamento: Departamento;

  constructor(private service: AbmVentasService, private id: ActivatedRoute) {}

  ngOnInit() {
    this.service.listarDepartamentosHabilitados().subscribe(data => {
      this.departamentos = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      // console.log("this.departamentos", this.departamentos);
      let id: number;
      this.id.params.subscribe(data => (id = data["id"]));
      console.log("se muestra -->" + id);
      this.service.listarDistritoId(id).subscribe(data => {
        this.distrito = data.data;

        console.log(
          "this.departamentoByFkdepartamentosid ---->",
          this.distrito.departamentoByFkdepartamentosid.id
        );

        this.service
          .listarDepartamentoId(
            this.distrito.departamentoByFkdepartamentosid.id
          )
          .subscribe(resp => {
            this.departamentoSelected = resp.data;
            console.log(
              "this.departamentoSelected======>",
              this.departamentoSelected
            );
          });
      });
    });
  }
  volverAtras() {
    window.history.back();
  }
  // -----------------
  actualizarDistrito(distrito: Distrito) {

    distrito.idDepartamento = distrito.departamentoByFkdepartamentosid.id;
    this.service.actualizarDistrito(distrito).subscribe(data => {
      this.distrito = data;
      alert("se actualizo el distrto " + distrito.nombre);
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
