import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LogisticaComponent } from "./logistica.component";
import { ProdGuardService as guard } from '../../guars/prod-guard.service';


const routes: Routes = [
  {
    path: "",
    component: LogisticaComponent,
    canActivate: [guard],
    data: { expectedRol: ['admin', 'user', 'gerente'] },
    children: [
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogisticaRoutingModule { }
