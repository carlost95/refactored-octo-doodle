import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbmComprasRoutingModule } from './abm-compras-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MaterialModule } from '../../material/material.module';

import { AbmComprasComponent } from './abm-compras.component';
import { SubMenuComprasComponent } from './sub-menu-compras/sub-menu-compras.component';
import { AgregarBancoComponent } from './bancos/agregar-banco/agregar-banco.component';
import { ListarBancoComponent } from './bancos/listar-banco/listar-banco.component';
import { ListarMarcaComponent } from './marca/listar-marca/listar-marca.component';
import { AgregarMarcaComponent } from './marca/agregar-marca/agregar-marca.component';
import { ModificarFormaPagoComponent } from './modificar-forma-pago/modificar-forma-pago.component';
import { ListarUnidadMedidaComponent } from './unidad-medida/listar-unidad-medida/listar-unidad-medida.component';
import { AgregarUnidadMedidaComponent } from './unidad-medida/agregar-unidad-medida/agregar-unidad-medida.component';
import { ListarRubroComponent } from './rubros/listar-rubro/listar-rubro.component';
import { AgregarRubroComponent } from './rubros/agregar-rubro/agregar-rubro.component';
import { ListarSubRubroComponent } from './sub-rubro/listar-sub-rubro/listar-sub-rubro.component';
import { AgregarSubRubroComponent } from './sub-rubro/agregar-sub-rubro/agregar-sub-rubro.component';
import { AgregarAjusteComponent } from './agregar-ajuste/agregar-ajuste.component';
import { ConsultarAjusteComponent } from './consultar-ajuste/consultar-ajuste.component';
import { ListarAjusteComponent } from './listar-ajuste/listar-ajuste.component';
import { interceptorProvider } from '../../interceptors/prod-interceptor.service';
import { EmpresaComponent } from './empresa/empresa.component';
import { AgregarEmpresaComponent } from './empresa/agregar-empresa/agregar-empresa.component';

@NgModule({
  declarations: [
    AbmComprasComponent,
    SubMenuComprasComponent,
    AgregarBancoComponent,
    ListarBancoComponent,
    ListarMarcaComponent,
    AgregarMarcaComponent,
    ModificarFormaPagoComponent,
    ListarUnidadMedidaComponent,
    AgregarUnidadMedidaComponent,
    ListarRubroComponent,
    AgregarRubroComponent,
    ListarSubRubroComponent,
    AgregarSubRubroComponent,
    ListarAjusteComponent,
    AgregarAjusteComponent,
    ConsultarAjusteComponent,
    EmpresaComponent,
    AgregarEmpresaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AbmComprasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [interceptorProvider],
  exports: [AgregarMarcaComponent],
})
export class AbmComprasModule { }
