import {LoginComponent} from './auth/login.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {LogoutComponent} from './auth/logout.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {
    path: 'ventas',
    loadChildren: () => import('./pages/ventas/ventas.module').then(m => m.VentasModule),
  },
  {
    path: 'compras',
    loadChildren: () => import('./pages/compras/compras.module').then(m => m.ComprasModule),
  },
  {
    path: 'abm-ventas',
    loadChildren: () => import('./abm-ventas/abm-ventas.module').then(m => m.AbmVentasModule),
  },
  {
    path: 'abm-compras',
    loadChildren: () => import('./pages/abm-compras/abm-compras.module').then(m => m.AbmComprasModule),
    // canActivate: [AuthGaurdService],
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./pages/seguridad/seguridad.module').then(m => m.SeguridadModule),
    // canActivate: [AuthGaurdService],
  },
  {
    path: 'logistica',
    loadChildren: () => import('./pages/logistica/logistica.module').then(m => m.LogisticaModule),
    // canActivate: [AuthGaurdService],
  }
  // { path: "login", component: LoginComponent },
  // {
  //   path: "logout",
  //   component: LogoutComponent,
  //   canActivate: [AuthGaurdService],
  // },
  // { path: "**", pathMatch: "full", redirectTo: "ventas" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
