import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasRoutingModule } from './ventas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { GoogleMapsModule } from '@angular/google-maps';

import { ListarDireccionComponent } from './listar-direccion/listar-direccion.component';
import { AgregarClienteComponent } from './clientes/agregar-cliente/agregar-cliente.component';
import { VentasComponent } from './ventas.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { AgregarDireccionComponent } from './direcciones/agregar-direccion/agregar-direccion.component';
import { ListarVentaComponent } from './listar-venta/listar-venta.component';
import { ListarRemitosComponent } from './listar-remitos/listar-remitos.component';
import { AgregarVentaComponent } from './agregar-venta/agregar-venta.component';
import { AgregarRemitoComponent } from './agregar-remito/agregar-remito.component';
import { NuevaVentaComponent } from './nueva-venta/nueva-venta.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    SubMenuComponent,
    VentasComponent,
    AgregarClienteComponent,
    ListarDireccionComponent,
    ClientesComponent,
    DireccionesComponent,
    AgregarDireccionComponent,
    ListarVentaComponent,
    ListarRemitosComponent,
    AgregarVentaComponent,
    AgregarRemitoComponent,
    NuevaVentaComponent,
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    SharedModule,
  ],
  // entryComponents: [ConfirmDialogComponent],
})
export class VentasModule {}
