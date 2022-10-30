import { AgregarSubRubroComponent } from './sub-rubro/agregar-sub-rubro/agregar-sub-rubro.component';
import { ListarSubRubroComponent } from './sub-rubro/listar-sub-rubro/listar-sub-rubro.component';
import { AgregarRubroComponent } from './rubros/agregar-rubro/agregar-rubro.component';
import { ListarRubroComponent } from './rubros/listar-rubro/listar-rubro.component';
import { AgregarUnidadMedidaComponent } from './unidad-medida/agregar-unidad-medida/agregar-unidad-medida.component';
import { ListarUnidadMedidaComponent } from './unidad-medida/listar-unidad-medida/listar-unidad-medida.component';
import { AgregarMarcaComponent } from './marca/agregar-marca/agregar-marca.component';
import { ListarMarcaComponent } from './marca/listar-marca/listar-marca.component';
import { ListarBancoComponent } from './bancos/listar-banco/listar-banco.component';
import { AgregarBancoComponent } from './bancos/agregar-banco/agregar-banco.component';
import { AbmComprasComponent } from './abm-compras.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgregarAjustesComponent } from './ajustes/agregar-ajustes/agregar-ajustes.component';
import { ProdGuardService as guard } from '../../guars/prod-guard.service';
import { EmpresaComponent } from './empresa/empresa.component';
import { AjustesComponent } from './ajustes/ajustes.component';

const routes: Routes = [
  {
    path: '',
    component: AbmComprasComponent,
    children: [
      {
        path: 'agregar-banco',
        component: AgregarBancoComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'agregar-marca',
        component: AgregarMarcaComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'agregar-unidad-medida',
        component: AgregarUnidadMedidaComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'agregar-rubro',
        component: AgregarRubroComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'agregar-sub-rubro',
        component: AgregarSubRubroComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },

      {
        path: 'listar-banco',
        component: ListarBancoComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'listar-marca',
        component: ListarMarcaComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'listar-unidad-medida',
        component: ListarUnidadMedidaComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'listar-rubro',
        component: ListarRubroComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'listar-sub-rubro',
        component: ListarSubRubroComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'listar-ajustes',
        component: AjustesComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'agregar-ajuste',
        component: AgregarAjustesComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'consultar-ajuste/:id',
        component: AgregarAjustesComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'listar-empresa',
        component: EmpresaComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbmComprasRoutingModule { }
