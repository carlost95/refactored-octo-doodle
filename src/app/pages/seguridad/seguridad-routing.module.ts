import { SeguridadComponent } from './seguridad.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { ProdGuardService as guard } from '../../guars/prod-guard.service';



const routes: Routes = [
  {
    path: '', component: SeguridadComponent,
    children: [
      {
        path: 'list-users',
        component: ListUsersComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin'] },
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [guard],
        data: { expectedRol: ['admin'] },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
