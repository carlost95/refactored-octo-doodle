import { AgregarDistritoComponent } from "./distrito/agregar-distrito/agregar-distrito.component";
import { AbmVentasComponent } from "./abm-ventas.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {DepartamentoComponent} from "./departamento/departamento.component";
import {DistritoComponent} from "./distrito/distrito.component";

const routes: Routes = [
  {
    path: "",
    component: AbmVentasComponent,
    children: [
      { path: "departamentos", component: DepartamentoComponent},
      { path: "distritos", component: DistritoComponent },

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbmVentasRoutingModule {}
