import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SubMenuComponent } from "./sub-menu/sub-menu.component";
import { VentasComponent } from "./ventas.component";
import { VentasRoutingModule } from "./ventas-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AgregarClienteComponent } from "./agregar-cliente/agregar-cliente.component";
import { ModificarClientesComponent } from "./modificar-clientes/modificar-clientes.component";
import { ListarClientesComponent } from "./listar-clientes/listar-clientes.component";
import { ListarDireccionComponent } from "./listar-direccion/listar-direccion.component";
import { MaterialModule } from "../material/material.module";

@NgModule({
  declarations: [
    SubMenuComponent,
    VentasComponent,
    ListarClientesComponent,
    AgregarClienteComponent,
    ModificarClientesComponent,
    ListarDireccionComponent
  ],
  imports: [CommonModule, VentasRoutingModule, FormsModule, MaterialModule, ReactiveFormsModule],
  // entryComponents: [ConfirmDialogComponent],
})
export class VentasModule {}
