import { FormsModule } from "@angular/forms";
import { AbmComprasComponent } from "./abm-compras.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AbmComprasRoutingModule } from "./abm-compras-routing.module";

import { SubMenuComprasComponent } from "./sub-menu-compras/sub-menu-compras.component";
import { AgregarBancoComponent } from "./agregar-banco/agregar-banco.component";
import { ListarBancoComponent } from "./listar-banco/listar-banco.component";
import { ModificarBancoComponent } from "./modificar-banco/modificar-banco.component";
import { ListarMarcaComponent } from "./listar-marca/listar-marca.component";
import { AgregarMarcaComponent } from "./agregar-marca/agregar-marca.component";
import { ModificarMarcaComponent } from "./modificar-marca/modificar-marca.component";
import { ListarFormaPagoComponent } from './listar-forma-pago/listar-forma-pago.component';
import { AgregarFormaPagoComponent } from './agregar-forma-pago/agregar-forma-pago.component';
import { ModificarFormaPagoComponent } from './modificar-forma-pago/modificar-forma-pago.component';
import { ListarUnidadMedidaComponent } from './listar-unidad-medida/listar-unidad-medida.component';
import { AgregarUnidadMedidaComponent } from './agregar-unidad-medida/agregar-unidad-medida.component';
import { ModificarUnidadMedidaComponent } from './modificar-unidad-medida/modificar-unidad-medida.component';
import { ListarRubroComponent } from './listar-rubro/listar-rubro.component';
import { AgregarRubroComponent } from './agregar-rubro/agregar-rubro.component';
import { ModificarRubroComponent } from './modificar-rubro/modificar-rubro.component';
import { ListarSubRubroComponent } from './listar-sub-rubro/listar-sub-rubro.component';
import { AgregarSubRubroComponent } from './agregar-sub-rubro/agregar-sub-rubro.component';
import { ModificarSubRubroComponent } from './modificar-sub-rubro/modificar-sub-rubro.component';
import { ListarAjunteComponent } from './listar-ajunte/listar-ajunte.component';
import { AgregarAjusteComponent } from './agregar-ajuste/agregar-ajuste.component';

@NgModule({
  declarations: [
    AbmComprasComponent,
    SubMenuComprasComponent,
    AgregarBancoComponent,
    ListarBancoComponent,
    ModificarBancoComponent,
    ListarMarcaComponent,
    AgregarMarcaComponent,
    ModificarMarcaComponent,
    ListarFormaPagoComponent,
    AgregarFormaPagoComponent,
    ModificarFormaPagoComponent,
    ListarUnidadMedidaComponent,
    AgregarUnidadMedidaComponent,
    ModificarUnidadMedidaComponent,
    ListarRubroComponent,
    AgregarRubroComponent,
    ModificarRubroComponent,
    ListarSubRubroComponent,
    AgregarSubRubroComponent,
    ModificarSubRubroComponent,
    ListarAjunteComponent,
    AgregarAjusteComponent
  ],
  imports: [CommonModule, FormsModule, AbmComprasRoutingModule]
})
export class AbmComprasModule {}
