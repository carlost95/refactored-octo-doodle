import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SubMenuComponent } from "./sub-menu/sub-menu.component";
import { VentasComponent } from "./ventas.component";
import { VentasRoutingModule } from "./ventas-routing.module";
// import { ListarDepartamentoComponent } from '../abm-ventas/listar-departamento/listar-departamento.component';
// import { AgregarDepartamentoComponent } from '../abm-ventas/agregar-departamento/agregar-departamento.component';
// import { ModificarDepartamentoComponent } from '../abm-ventas/modificar-departamento/modificar-departamento.component';
import { FormsModule } from "@angular/forms";
// import { ListarDistritosComponent } from '../abm-ventas/listar-distritos/listar-distritos.component';
// import { AgregarDistritoComponent } from '../abm-ventas/agregar-distrito/agregar-distrito.component';
// import { ModificarDistritoComponent } from '../abm-ventas/modificar-distrito/modificar-distrito.component';
import { AgregarClienteComponent } from "./agregar-cliente/agregar-cliente.component";
import { ModificarClientesComponent } from "./modificar-clientes/modificar-clientes.component";
import { ListarClientesComponent } from "./listar-clientes/listar-clientes.component";
import { ListarDireccionComponent } from "./listar-direccion/listar-direccion.component";

@NgModule({
  declarations: [
    SubMenuComponent,
    VentasComponent,
    ListarClientesComponent,
    AgregarClienteComponent,
    ModificarClientesComponent,
    ListarDireccionComponent,
  ],
  imports: [CommonModule, VentasRoutingModule, FormsModule],
  // entryComponents: [ConfirmDialogComponent],
})
export class VentasModule {}
