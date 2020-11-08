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
      // { path: 'listar-tipo-direccion', component: ListarTipoDireccionComponent},
      // { path: "agregar-departamento", component: AgregarDepartamentoComponent },
      { path: "agregar-distrito", component: AgregarDistritoComponent },
      // {path: 'agregar-tipo-direccion', component: AgregarTipoDireccionComponent},
      // {
      //   path: "modificar-departamento/:id",
      //   component: ModificarDepartamentoComponent
      // },
      // {path : "modificar-distrito/:id", component: ModificarDistritoComponent},
      // {path: 'modificar-tipo-direccion/:id', component: ModificarTipoDireccionComponent}

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbmVentasRoutingModule {}
