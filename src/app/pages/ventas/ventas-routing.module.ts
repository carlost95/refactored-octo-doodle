import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { VentasComponent } from './ventas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { AgregarRemitoComponent } from './agregar-remito/agregar-remito.component';
import { ListarVentaComponent } from './venta/listar-venta/listar-venta.component';
import { ListarRemitosComponent } from './listar-remitos/listar-remitos.component';
import { AgregarVentaComponent } from './venta/agregar-venta/agregar-venta.component';
import { CrearDireccionComponent } from './direcciones/crear-direccion/crear-direccion.component';
import { ProdGuardService as guard } from '../../guars/prod-guard.service';

const routes: Routes = [
  {
    path: '',
    component: VentasComponent,
    children: [
      {
        path: 'clientes',
        component: ClientesComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] }
      },
      {
        path: 'listar-venta',
        component: ListarVentaComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] }
      },
      {
        path: 'listar-remitos',
        component: ListarRemitosComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] }
      },
      {
        path: 'direcciones/:idCliente',
        component: DireccionesComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] }
      },
      {
        path: 'crear-direccion',
        component: CrearDireccionComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] }
      },
      {
        path: 'agregar-remitos',
        component: AgregarRemitoComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] }
      },
      {
        path: 'agregar-venta',
        component: AgregarVentaComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] }
      },
      {
        path: 'consultar-venta/:idVenta',
        component: AgregarVentaComponent,
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
export class VentasRoutingModule { }
