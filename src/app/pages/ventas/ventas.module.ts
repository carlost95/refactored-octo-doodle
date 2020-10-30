import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubMenuComponent} from './sub-menu/sub-menu.component';
import {VentasComponent} from './ventas.component';
import {VentasRoutingModule} from './ventas-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgregarClienteComponent} from './clientes/agregar-cliente/agregar-cliente.component';
import {ModificarClientesComponent} from './modificar-clientes/modificar-clientes.component';
import {ListarDireccionComponent} from './listar-direccion/listar-direccion.component';
import {MaterialModule} from '../../material/material.module';
import {ClientesComponent} from './clientes/clientes.component';
import {DireccionesComponent} from './direcciones/direcciones.component';
import {AgregarDireccionComponent} from './direcciones/agregar-direccion/agregar-direccion.component';

@NgModule({
  declarations: [
    SubMenuComponent,
    VentasComponent,
    AgregarClienteComponent,
    ModificarClientesComponent,
    ListarDireccionComponent,
    ClientesComponent,
    DireccionesComponent,
    AgregarDireccionComponent,
  ],
  imports: [CommonModule, VentasRoutingModule, FormsModule, MaterialModule, ReactiveFormsModule],
  // entryComponents: [ConfirmDialogComponent],
})
export class VentasModule {
}
