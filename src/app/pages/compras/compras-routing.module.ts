import { AgregarProveedorComponent } from './proveedores/agregar-proveedor/agregar-proveedor.component';
import { ListarProveedorComponent } from './proveedores/listar-proveedor/listar-proveedor.component';

import { ConsultarPedidoComponent } from './consultar-pedido/consultar-pedido.component';
import { AgregarPedidoComponent } from './agregar-pedido/agregar-pedido.component';
import { ListarPedidoComponent } from './listar-pedido/listar-pedido.component';
import { AgregarArticuloComponent } from './articulos/agregar-articulo/agregar-articulo.component';
import { ListarArticulosComponent } from './articulos/listar-articulos/listar-articulos.component';
import { ComprasComponent } from './compras.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdGuardService as guard } from '../../guars/prod-guard.service';
import { ListarCuentasComponent } from './cuentas/listar-cuentas/listar-cuentas.component';

const routes: Routes = [
  {
    path: '',
    component: ComprasComponent,
    children: [
      {
        path: 'listar-proveedor',
        component: ListarProveedorComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] },
      },
      {
        path: 'listar-articulos',
        component: ListarArticulosComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] },
      },
      {
        path: 'listar-pedido',
        component: ListarPedidoComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] },
      },
      {
        path: 'agregar-proveedor',
        component: AgregarProveedorComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin'] },
      },
      {
        path: 'agregar-articulo',
        component: AgregarArticuloComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin'] },
      },
      {
        path: 'agregar-pedido',
        component: AgregarPedidoComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin'] },
      },
      {
        path: 'consultar-pedido/:id',
        component: ConsultarPedidoComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] },
      },
      {
        path: 'listar-cuentas/:idProveedor',
        component: ListarCuentasComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprasRoutingModule {}
