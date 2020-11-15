import {LoginComponent} from './auth/login.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ProdGuardService as guard} from './guars/prod-guard.service';
import {ResetPasswordComponent} from './pages/seguridad/reset-password/reset-password.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {
    path: 'ventas',
    loadChildren: () => import('./pages/ventas/ventas.module').then(m => m.VentasModule),
    canActivate: [guard], data: {expectedRol: ['admin', 'user']}
  },
  {
    path: 'compras',
    loadChildren: () => import('./pages/compras/compras.module').then(m => m.ComprasModule),
    canActivate: [guard], data: {expectedRol: ['admin', 'user']}
  },
  {
    path: 'abm-ventas',
    loadChildren: () => import('./pages/abm-ventas/abm-ventas.module').then(m => m.AbmVentasModule),
    canActivate: [guard], data: {expectedRol: ['admin', 'user']}
  },
  {
    path: 'abm-compras',
    loadChildren: () => import('./pages/abm-compras/abm-compras.module').then(m => m.AbmComprasModule),
    canActivate: [guard], data: {expectedRol: ['admin', 'user']}
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./pages/seguridad/seguridad.module').then(m => m.SeguridadModule),
    canActivate: [guard], data: {expectedRol: ['admin']}
  },
  {
    path: 'logistica',
    loadChildren: () => import('./pages/logistica/logistica.module').then(m => m.LogisticaModule),
    canActivate: [guard], data: {expectedRol: ['admin', 'user']}
  },
  {
    path: 'reset-password', component: ResetPasswordComponent,
    canActivate: [guard], data: {expectedRol: ['admin', 'user', 'gerente']}
  },
  {path: 'login', component: LoginComponent},
  {path: '**', pathMatch: 'full', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
