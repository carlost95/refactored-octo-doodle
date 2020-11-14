import {AbmVentasComponent} from './abm-ventas.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DepartamentoComponent} from './departamento/departamento.component';
import {DistritoComponent} from './distrito/distrito.component';
import {ProdGuardService as guard} from '../../guars/prod-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AbmVentasComponent,
    children: [
      {
        path: 'departamentos', component: DepartamentoComponent,
        canActivate: [guard], data: {expectedRol: ['admin', 'gerente', 'user']}
      },
      {
        path: 'distritos', component: DistritoComponent,
        canActivate: [guard], data: {expectedRol: ['admin', 'gerente', 'user']}
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbmVentasRoutingModule {
}
