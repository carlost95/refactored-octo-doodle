import { SeguridadComponent } from './seguridad.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {ListUsersComponent} from './list-users/list-users.component';


const routes: Routes =  [
  {path: '', component: SeguridadComponent,
  children: [
    {path: 'list-users', component: ListUsersComponent},
    {path: 'register', component: RegisterComponent},
    // {path: 'agregar-departamento', component: AgregarDepartamentoComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
