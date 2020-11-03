import { SeguridadComponent } from './seguridad.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogoutComponent} from './logout/logout.component';
import {ListUsersComponent} from './list-users/list-users.component';


const routes: Routes =  [
  {path: '', component: SeguridadComponent,
  children: [
    {path: 'list-users', component: ListUsersComponent},
    {path: 'logout', component: LogoutComponent},
    // {path: 'agregar-departamento', component: AgregarDepartamentoComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
