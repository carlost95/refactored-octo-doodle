import { AgregarProveedorComponent } from './proveedores/agregar-proveedor/agregar-proveedor.component';
import { ListarProveedorComponent } from './proveedores/listar-proveedor/listar-proveedor.component';

import { AgregarPedidoComponent } from './pedidos/agregar-pedido/agregar-pedido.component';
import { ListarPedidoComponent } from './pedidos/listar-pedido/listar-pedido.component';
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
        data: { expectedRol: ['admin', 'user', 'gerente'] },
      },
      {
        path: 'listar-articulos',
        component: ListarArticulosComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user', 'gerente'] },
      },
      {
        path: 'listar-pedido',
        component: ListarPedidoComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user', 'gerente'] },
      },
      {
        path: 'agregar-proveedor',
        component: AgregarProveedorComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'agregar-articulo',
        component: AgregarArticuloComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'agregar-pedido',
        component: AgregarPedidoComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'gerente'] },
      },
      {
        path: 'consultar-pedido/:id',
        component: AgregarPedidoComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user', 'gerente'] },
      },
      {
        path: 'listar-cuentas/:idProveedor',
        component: ListarCuentasComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin', 'user', 'gerente'] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComprasRoutingModule { }
