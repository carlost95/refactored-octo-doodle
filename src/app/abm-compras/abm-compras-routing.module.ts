import { ListarAjunteComponent } from './listar-ajunte/listar-ajunte.component';
import { ModificarSubRubroComponent } from './modificar-sub-rubro/modificar-sub-rubro.component';
import { AgregarSubRubroComponent } from './agregar-sub-rubro/agregar-sub-rubro.component';
import { ListarSubRubroComponent } from './listar-sub-rubro/listar-sub-rubro.component';
import { ModificarRubroComponent } from './modificar-rubro/modificar-rubro.component';
import { AgregarRubroComponent } from './agregar-rubro/agregar-rubro.component';
import { ListarRubroComponent } from './listar-rubro/listar-rubro.component';
import { ModificarUnidadMedidaComponent } from './modificar-unidad-medida/modificar-unidad-medida.component';
import { AgregarUnidadMedidaComponent } from './agregar-unidad-medida/agregar-unidad-medida.component';
import { AgregarTipoDireccionComponent } from './../abm-ventas/agregar-tipo-direccion/agregar-tipo-direccion.component';
import { ListarUnidadMedidaComponent } from './listar-unidad-medida/listar-unidad-medida.component';
import { ModificarFormaPagoComponent } from './modificar-forma-pago/modificar-forma-pago.component';
import { AgregarFormaPagoComponent } from './agregar-forma-pago/agregar-forma-pago.component';
import { ListarFormaPagoComponent } from './listar-forma-pago/listar-forma-pago.component';
import { ModificarMarcaComponent } from "./modificar-marca/modificar-marca.component";
import { AgregarMarcaComponent } from "./agregar-marca/agregar-marca.component";
import { ListarMarcaComponent } from "./listar-marca/listar-marca.component";
import { ModificarBancoComponent } from "./modificar-banco/modificar-banco.component";
import { ListarBancoComponent } from "./listar-banco/listar-banco.component";
import { AgregarBancoComponent } from "./agregar-banco/agregar-banco.component";
import { AbmComprasComponent } from "./abm-compras.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: AbmComprasComponent,
    children: [
      { path: "agregar-banco", component: AgregarBancoComponent },
      { path: "agregar-marca", component: AgregarMarcaComponent },
      { path: "agregar-forma-pago", component: AgregarFormaPagoComponent },
      { path: "agregar-unidad-medida", component: AgregarUnidadMedidaComponent },
      { path: "agregar-rubro", component: AgregarRubroComponent },
      { path: "agregar-sub-rubro", component: AgregarSubRubroComponent },
      { path: "listar-banco", component: ListarBancoComponent },
      { path: "listar-marca", component: ListarMarcaComponent },
      { path: "listar-forma-pago", component: ListarFormaPagoComponent },
      { path: "listar-unidad-medida", component: ListarUnidadMedidaComponent },
      { path: "listar-rubro", component: ListarRubroComponent },
      { path: "listar-sub-rubro", component: ListarSubRubroComponent },
      { path: "listar-ajuste", component: ListarAjunteComponent },
      { path: "modificar-banco/:id", component: ModificarBancoComponent },
      { path: "modificar-forma-pago/:id", component: ModificarFormaPagoComponent },
      { path: "modificar-unidad-medida/:id", component: ModificarUnidadMedidaComponent },
      { path: "modificar-marca/:id", component: ModificarMarcaComponent },
      { path: "modificar-rubro/:id", component: ModificarRubroComponent },
      { path: "modificar-sub-rubro/:id", component: ModificarSubRubroComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AbmComprasRoutingModule {}
