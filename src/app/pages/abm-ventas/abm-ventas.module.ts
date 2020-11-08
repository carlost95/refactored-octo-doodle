import { ModificarDistritoComponent } from './modificar-distrito/modificar-distrito.component';
import { AgregarDistritoComponent } from './distrito/agregar-distrito/agregar-distrito.component';
import { AgregarTipoDireccionComponent } from './agregar-tipo-direccion/agregar-tipo-direccion.component';

import { ListarDistritosComponent } from './listar-distritos/listar-distritos.component';
import { ListarTipoDireccionComponent } from './listar-tipo-direccion/listar-tipo-direccion.component';
import { ModificarDepartamentoComponent } from "./modificar-departamento/modificar-departamento.component";
import { ModificarTipoDireccionComponent } from './modificar-tipo-direccion/modificar-tipo-direccion.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ListarDepartamentoComponent } from "./listar-departamento/listar-departamento.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AbmVentasRoutingModule } from "./abm-ventas-routing.module";
import { AbmVentasComponent } from "./abm-ventas.component";
import { SubMenuVentasComponent } from "./sub-menu-ventas/sub-menu-ventas.component";
import { AgregarDepartamentoComponent } from "./departamento/agregar-departamento/agregar-departamento.component";
import { DepartamentoComponent } from './departamento/departamento.component';
import {MaterialModule} from "../../material/material.module";
import { DistritoComponent } from './distrito/distrito.component';

@NgModule({
  declarations: [
    AbmVentasComponent,
    SubMenuVentasComponent,
    ListarDepartamentoComponent,
    AgregarDepartamentoComponent,
    AgregarDistritoComponent,
    AgregarTipoDireccionComponent,
    ModificarDepartamentoComponent,
    ListarDistritosComponent,
    ListarTipoDireccionComponent,
    ModificarDistritoComponent,
    ModificarTipoDireccionComponent,
    DepartamentoComponent,
    DistritoComponent
  ],
  imports: [CommonModule, AbmVentasRoutingModule, FormsModule, MaterialModule, ReactiveFormsModule]
})
export class AbmVentasModule {}