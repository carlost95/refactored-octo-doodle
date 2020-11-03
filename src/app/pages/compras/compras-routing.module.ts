import {ConsultarPedidoComponent} from './consultar-pedido/consultar-pedido.component';
import {AgregarPedidoComponent} from './agregar-pedido/agregar-pedido.component';
import {ListarPedidoComponent} from './listar-pedido/listar-pedido.component';
import {AgregarArticuloComponent} from './agregar-articulo/agregar-articulo.component';
import {AgregarProveedorComponent} from './agregar-proveedor/agregar-proveedor.component';
import {ListarArticulosComponent} from './listar-articulos/listar-articulos.component';
import {ListarProveedorComponent} from './listar-proveedor/listar-proveedor.component';
import {ComprasComponent} from './compras.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProdGuardService as guard} from '../../guars/prod-guard.service';

const routes: Routes = [
  {
    path: '', component: ComprasComponent,
    children: [
      {
        path: 'listar-proveedor', component: ListarProveedorComponent,
        canActivate: [guard], data: {expectedRol: ['admin', 'user']}
      },
      {
        path: 'listar-articulos', component: ListarArticulosComponent,
        canActivate: [guard], data: {expectedRol: ['admin', 'user']}
      },
      {
        path: 'listar-pedido', component: ListarPedidoComponent,
        canActivate: [guard], data: {expectedRol: ['admin', 'user']}
      },
      {
        path: 'agregar-proveedor', component: AgregarProveedorComponent,
        canActivate: [guard], data: {expectedRol: ['admin']}
      },
      {
        path: 'agregar-articulo', component: AgregarArticuloComponent,
        canActivate: [guard], data: {expectedRol: ['admin']}
      },
      {
        path: 'agregar-pedido', component: AgregarPedidoComponent,
        canActivate: [guard], data: {expectedRol: ['admin']}
      },
      {
        path: 'consultar-pedido/:id', component: ConsultarPedidoComponent,
        canActivate: [guard], data: {expectedRol: ['admin', 'user']}
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule {
}
