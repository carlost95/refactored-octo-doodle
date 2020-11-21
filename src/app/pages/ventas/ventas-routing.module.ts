import {VentasComponent} from './ventas.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientesComponent} from './clientes/clientes.component';
import {DireccionesComponent} from './direcciones/direcciones.component';
import {AgregarDireccionComponent} from './direcciones/agregar-direccion/agregar-direccion.component';

const routes: Routes = [
  {
    path: '', component: VentasComponent,
    children: [
      {path: 'clientes', component: ClientesComponent},
      {path: 'direcciones/:id', component: DireccionesComponent},
      {path: 'agregar-direccion/:id', component: AgregarDireccionComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule {
}
