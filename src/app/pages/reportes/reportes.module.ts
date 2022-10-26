import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteComponent } from './reporte.component';
import { ReporteRoutingModule } from './reporte-routing.module';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { EntregasComponent } from './components/entregas/entregas.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReporteComponent, SubMenuComponent, EntregasComponent, PedidosComponent, ProveedoresComponent, ClientesComponent, VentasComponent],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ReportesModule { }
