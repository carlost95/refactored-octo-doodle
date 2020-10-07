import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AbmComprasComponent } from "./abm-compras.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AbmComprasRoutingModule } from "./abm-compras-routing.module";

import { SubMenuComprasComponent } from "./sub-menu-compras/sub-menu-compras.component";
import { AgregarBancoComponent } from "./agregar-banco/agregar-banco.component";
import { ListarBancoComponent } from "./listar-banco/listar-banco.component";
import { ListarMarcaComponent } from "./listar-marca/listar-marca.component";
import { AgregarMarcaComponent } from "./agregar-marca/agregar-marca.component";
import { ListarFormaPagoComponent } from './listar-forma-pago/listar-forma-pago.component';
import { AgregarFormaPagoComponent } from './agregar-forma-pago/agregar-forma-pago.component';
import { ModificarFormaPagoComponent } from './modificar-forma-pago/modificar-forma-pago.component';
import { ListarUnidadMedidaComponent } from './listar-unidad-medida/listar-unidad-medida.component';
import { AgregarUnidadMedidaComponent } from './agregar-unidad-medida/agregar-unidad-medida.component';
import { ListarRubroComponent } from './listar-rubro/listar-rubro.component';
import { AgregarRubroComponent } from './agregar-rubro/agregar-rubro.component';
import { ListarSubRubroComponent } from './listar-sub-rubro/listar-sub-rubro.component';
import { AgregarSubRubroComponent } from './agregar-sub-rubro/agregar-sub-rubro.component';
import { AgregarAjusteComponent } from './agregar-ajuste/agregar-ajuste.component';
import { MaterialModule } from '../material/material.module';
import { ConsultarAjusteComponent } from './consultar-ajuste/consultar-ajuste.component';
import { SharedModule } from '../shared/shared.module';
import { ListarAjusteComponent } from './listar-ajuste/listar-ajuste.component';

@NgModule({
  declarations: [
    AbmComprasComponent,
    SubMenuComprasComponent,
    AgregarBancoComponent,
    ListarBancoComponent,
    ListarMarcaComponent,
    AgregarMarcaComponent,
    ListarFormaPagoComponent,
    AgregarFormaPagoComponent,
    ModificarFormaPagoComponent,
    ListarUnidadMedidaComponent,
    AgregarUnidadMedidaComponent,
    ListarRubroComponent,
    AgregarRubroComponent,
    ListarSubRubroComponent,
    AgregarSubRubroComponent,
    ListarAjusteComponent,
    AgregarAjusteComponent,
    ConsultarAjusteComponent
  ],
  imports: [CommonModule, FormsModule, AbmComprasRoutingModule, MaterialModule, ReactiveFormsModule, SharedModule],
  exports: [AgregarMarcaComponent]
})
export class AbmComprasModule { }
