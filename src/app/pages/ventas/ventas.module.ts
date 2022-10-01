import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasRoutingModule } from './ventas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { GoogleMapsModule } from '@angular/google-maps';

import { AgregarClienteComponent } from './clientes/agregar-cliente/agregar-cliente.component';
import { VentasComponent } from './ventas.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { ListarVentaComponent } from './venta/listar-venta/listar-venta.component';
import { ListarRemitosComponent } from './listar-remitos/listar-remitos.component';
import { AgregarRemitoComponent } from './agregar-remito/agregar-remito.component';
import { SharedModule } from '../../shared/shared.module';
import { CrearDireccionComponent } from './direcciones/crear-direccion/crear-direccion.component';
import { LoadingMapComponent } from './direcciones/loading-map/loading-map.component';
import { ViewMapClientComponent } from './direcciones/view-map-client/view-map-client.component';
import { ConsultarVentaComponent } from './venta/consultar-venta/consultar-venta.component';

@NgModule({
  declarations: [
    SubMenuComponent,
    VentasComponent,
    AgregarClienteComponent,
    ClientesComponent,
    DireccionesComponent,
    ListarVentaComponent,
    ListarRemitosComponent,
    AgregarRemitoComponent,
    CrearDireccionComponent,
    LoadingMapComponent,
    ViewMapClientComponent,
    ConsultarVentaComponent,
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
export class VentasModule { }
