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

const routes: Routes = [
  {
    path: '', component: ComprasComponent,
    children: [
      {
        path: 'listar-proveedor', component: ListarProveedorComponent,
      },
      {path: 'listar-articulos', component: ListarArticulosComponent},
      {path: 'listar-pedido', component: ListarPedidoComponent},
      {path: 'agregar-proveedor', component: AgregarProveedorComponent},
      {path: 'agregar-articulo', component: AgregarArticuloComponent},
      {path: 'agregar-pedido', component: AgregarPedidoComponent},
      {path: 'consultar-pedido/:id', component: ConsultarPedidoComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComprasRoutingModule {
}
