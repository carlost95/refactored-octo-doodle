import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteComponent } from './reporte.component';
import { ProdGuardService as guard } from '../../guars/prod-guard.service';
import { EntregasComponent } from './components/entregas/entregas.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { VentasComponent } from './components/ventas/ventas.component';



const routes: Routes = [
  {
    path: '',
    component: ReporteComponent,
    children: [
      {
        path: 'reporte-venta',
        component: VentasComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] }
      },
      {
        path: 'reporte-remito',
        component: EntregasComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] }
      },
      {
        path: 'reporte-pedido',
        component: PedidosComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] }
      },
      {
        path: 'reporte-cliente',
        component: ClientesComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] }
      },
      {
        path: 'reporte-proveedor',
        component: ProveedoresComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] }
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReporteRoutingModule { }
