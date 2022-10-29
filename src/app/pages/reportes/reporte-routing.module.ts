import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteComponent } from './reporte.component';
import { ProdGuardService as guard } from '../../guars/prod-guard.service';
import { EntregasComponent } from './components/entregas/entregas.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { RecaudacionesComponent } from './components/recaudaciones/recaudaciones.component';



const routes: Routes = [
  {
    path: '',
    component: ReporteComponent,
    children: [
      {
        path: 'reporte-venta',
        component: VentasComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] }
      },
      {
        path: 'reporte-remito',
        component: EntregasComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] }
      },
      {
        path: 'reporte-pedido',
        component: PedidosComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] }
      },
      {
        path: 'reporte-recaudacion',
        component: RecaudacionesComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] }
      }
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteRoutingModule { }
