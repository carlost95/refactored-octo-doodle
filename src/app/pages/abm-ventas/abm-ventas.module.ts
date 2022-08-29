import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { interceptorProvider } from '../../interceptors/prod-interceptor.service';

import { AbmVentasRoutingModule } from './abm-ventas-routing.module';
import { AgregarDistritoComponent } from './distrito/agregar-distrito/agregar-distrito.component';
import { AbmVentasComponent } from './abm-ventas.component';
import { SubMenuVentasComponent } from './sub-menu-ventas/sub-menu-ventas.component';
import { AgregarDepartamentoComponent } from './departamento/agregar-departamento/agregar-departamento.component';
import { DepartamentoComponent } from './departamento/departamento.component';
import { DistritoComponent } from './distrito/distrito.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AbmVentasComponent,
    SubMenuVentasComponent,
    AgregarDepartamentoComponent,
    AgregarDistritoComponent,
    DepartamentoComponent,
    DistritoComponent,
  ],
  imports: [
    CommonModule,
    AbmVentasRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [interceptorProvider],
})
export class AbmVentasModule {}
