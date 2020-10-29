import { AgregarSubRubroComponent } from './agregar-sub-rubro/agregar-sub-rubro.component';
import { ListarSubRubroComponent } from './listar-sub-rubro/listar-sub-rubro.component';
import { AgregarRubroComponent } from './agregar-rubro/agregar-rubro.component';
import { ListarRubroComponent } from './listar-rubro/listar-rubro.component';
import { AgregarUnidadMedidaComponent } from './agregar-unidad-medida/agregar-unidad-medida.component';
import { ListarUnidadMedidaComponent } from './listar-unidad-medida/listar-unidad-medida.component';
import { ModificarFormaPagoComponent } from './modificar-forma-pago/modificar-forma-pago.component';
import { AgregarFormaPagoComponent } from './agregar-forma-pago/agregar-forma-pago.component';
import { ListarFormaPagoComponent } from './listar-forma-pago/listar-forma-pago.component';
import { AgregarMarcaComponent } from './agregar-marca/agregar-marca.component';
import { ListarMarcaComponent } from './listar-marca/listar-marca.component';
import { ListarBancoComponent } from './listar-banco/listar-banco.component';
import { AgregarBancoComponent } from './agregar-banco/agregar-banco.component';
import { AbmComprasComponent } from './abm-compras.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultarAjusteComponent } from './consultar-ajuste/consultar-ajuste.component';
import { AgregarAjusteComponent } from './agregar-ajuste/agregar-ajuste.component';
import { ListarAjusteComponent } from './listar-ajuste/listar-ajuste.component';

const routes: Routes = [
  {
    path: '',
    component: AbmComprasComponent,
    children: [
      { path: 'agregar-banco', component: AgregarBancoComponent },
      { path: 'agregar-marca', component: AgregarMarcaComponent },
      { path: 'agregar-forma-pago', component: AgregarFormaPagoComponent },
      { path: 'agregar-unidad-medida', component: AgregarUnidadMedidaComponent },
      { path: 'agregar-rubro', component: AgregarRubroComponent },
      { path: 'agregar-sub-rubro', component: AgregarSubRubroComponent },
      { path: 'agregar-ajuste', component: AgregarAjusteComponent },
      { path: 'listar-banco', component: ListarBancoComponent },
      { path: 'listar-marca', component: ListarMarcaComponent },
      { path: 'listar-forma-pago', component: ListarFormaPagoComponent },
      { path: 'listar-unidad-medida', component: ListarUnidadMedidaComponent },
      { path: 'listar-rubro', component: ListarRubroComponent },
      { path: 'listar-sub-rubro', component: ListarSubRubroComponent },
      { path: 'listar-ajuste', component: ListarAjusteComponent },
      { path: 'modificar-forma-pago/:id', component: ModificarFormaPagoComponent },
      { path: 'consultar-ajuste/:id', component: ConsultarAjusteComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbmComprasRoutingModule { }