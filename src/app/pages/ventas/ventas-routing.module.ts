import { ListarDireccionComponent } from './listar-direccion/listar-direccion.component';
import { ModificarClientesComponent } from './modificar-clientes/modificar-clientes.component';
import { AgregarClienteComponent } from './clientes/agregar-cliente/agregar-cliente.component';
import { VentasComponent } from './ventas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientesComponent} from "./clientes/clientes.component";
import {DireccionesComponent} from "./direcciones/direcciones.component";
import {AgregarDireccionComponent} from "./direcciones/agregar-direccion/agregar-direccion.component";

const routes: Routes = [
    {path: '', component: VentasComponent,
    children: [
      // {path: 'listar-departamentos', component: ListarDepartamentoComponent},
      // {path: 'agregar-departamento', component: AgregarDepartamentoComponent},
      // {path: 'modificar-departamento/:id', component: ModificarDepartamentoComponent},
      // {path: 'agregar-distrito', component: AgregarDistritoComponent},
      // {path: 'modificar-distrito/:id', component: ModificarDistritoComponent},
      {path: 'clientes', component: ClientesComponent},
      {path: 'direcciones/:id', component: DireccionesComponent},
      {path: 'agregar-direccion/:id', component: AgregarDireccionComponent},
    ]}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasRoutingModule { }
