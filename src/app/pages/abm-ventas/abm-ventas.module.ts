import { AgregarDistritoComponent } from './distrito/agregar-distrito/agregar-distrito.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
    AgregarDepartamentoComponent,
    AgregarDistritoComponent,
    DepartamentoComponent,
    DistritoComponent
  ],
  imports: [CommonModule, AbmVentasRoutingModule, FormsModule, MaterialModule, ReactiveFormsModule]
})
export class AbmVentasModule {}
