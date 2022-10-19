import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteComponent } from './reporte.component';
import {ReporteRoutingModule} from './reporte-routing.module';
import { VentaPorMesComponent } from './components/venta-por-mes/venta-por-mes.component';

@NgModule({
  declarations: [ReporteComponent, VentaPorMesComponent],
  imports: [
    CommonModule,
    ReporteRoutingModule
  ]
})
export class ReportesModule { }
