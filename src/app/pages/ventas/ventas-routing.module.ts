import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentasComponent } from './ventas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { AgregarRemitoComponent } from './agregar-remito/agregar-remito.component';
import { ListarVentaComponent } from './venta/listar-venta/listar-venta.component';
import { ListarRemitosComponent } from './listar-remitos/listar-remitos.component';
import { AgregarVentaComponent } from './venta/agregar-venta/agregar-venta.component';
import { CrearDireccionComponent } from './direcciones/crear-direccion/crear-direccion.component';
import { ConsultarVentaComponent } from './venta/consultar-venta/consultar-venta.component';

const routes: Routes = [
  {
    path: '',
    component: VentasComponent,
    children: [
      { path: 'clientes', component: ClientesComponent },
      { path: 'listar-venta', component: ListarVentaComponent },
      { path: 'listar-remitos', component: ListarRemitosComponent },
      { path: 'direcciones/:idCliente', component: DireccionesComponent },
      { path: 'crear-direccion', component: CrearDireccionComponent },
      { path: 'agregar-remitos', component: AgregarRemitoComponent },
      { path: 'agregar-venta', component: AgregarVentaComponent },
      { path: 'consultar-venta/:idVenta', component: ConsultarVentaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentasRoutingModule { }
