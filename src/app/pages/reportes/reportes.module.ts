import { MaterialModule } from './../../material/material.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteComponent } from './reporte.component';
import { ReporteRoutingModule } from './reporte-routing.module';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { EntregasComponent } from './components/entregas/entregas.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { FormsModule } from '@angular/forms';
import { RecaudacionesComponent } from './components/recaudaciones/recaudaciones.component';

@NgModule({
  declarations: [ReporteComponent, SubMenuComponent, EntregasComponent, PedidosComponent, VentasComponent, RecaudacionesComponent],
  imports: [
    CommonModule,
    ReporteRoutingModule,
    SharedModule,
    FormsModule,
    MaterialModule
  ]
})
export class ReportesModule { }
