import { ModificarDistritoComponent } from './modificar-distrito/modificar-distrito.component';
import { AgregarDepartamentoComponent } from "./agregar-departamento/agregar-departamento.component";
import { AgregarDistritoComponent } from "./agregar-distrito/agregar-distrito.component";
import { AgregarTipoDireccionComponent } from './agregar-tipo-direccion/agregar-tipo-direccion.component';
import { ListarDistritosComponent } from "./listar-distritos/listar-distritos.component";
import { ListarTipoDireccionComponent } from './listar-tipo-direccion/listar-tipo-direccion.component';
import { ModificarDepartamentoComponent } from "./modificar-departamento/modificar-departamento.component";
import { ModificarTipoDireccionComponent } from './modificar-tipo-direccion/modificar-tipo-direccion.component';

import { ListarDepartamentoComponent } from "./listar-departamento/listar-departamento.component";
import { AbmVentasComponent } from "./abm-ventas.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AbmVentasComponent,
    children: [
      { path: "listar-departamento", component: ListarDepartamentoComponent },
      { path: "listar-distritos", component: ListarDistritosComponent },
      { path: 'listar-tipo-direccion', component: ListarTipoDireccionComponent},
      { path: "agregar-departamento", component: AgregarDepartamentoComponent },
      { path: "agregar-distrito", component: AgregarDistritoComponent },
      {path: 'agregar-tipo-direccion', component: AgregarTipoDireccionComponent},
      {
        path: "modificar-departamento/:id",
        component: ModificarDepartamentoComponent
      },
      {path : "modificar-distrito/:id", component: ModificarDistritoComponent},
      {path: 'modificar-tipo-direccion/:id', component: ModificarTipoDireccionComponent}

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbmVentasRoutingModule {}
