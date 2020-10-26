import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LogisticaComponent } from "./logistica.component";

// const routes: Routes = [];
const routes: Routes = [
  {
    path: "",
    component: LogisticaComponent,
    children: [
      // {path: 'listar-departamentos', component: ListarDepartamentoComponent},
      // {path: 'agregar-departamento', component: AgregarDepartamentoComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogisticaRoutingModule {}
