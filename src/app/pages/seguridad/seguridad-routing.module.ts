import { SeguridadComponent } from './seguridad.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes =  [
  {path: '', component: SeguridadComponent,
  children: [
    // {path: 'listar-departamentos', component: ListarDepartamentoComponent},
    // {path: 'agregar-departamento', component: AgregarDepartamentoComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
