import { LogoutComponent } from "./logout/logout.component";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGaurdService } from "./service/auth-gaurd.service";

const routes: Routes = [
  {
    path: "ventas",
    loadChildren: () => import('./ventas/ventas.module').then(m => m.VentasModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: "compras",
    loadChildren: () => import('./compras/compras.module').then(m => m.ComprasModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: "abm-ventas",
    loadChildren: () => import('./abm-ventas/abm-ventas.module').then(m => m.AbmVentasModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: "abm-compras",
    loadChildren: () => import('./abm-compras/abm-compras.module').then(m => m.AbmComprasModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: "seguridad",
    loadChildren: () => import('./seguridad/seguridad.module').then(m => m.SeguridadModule),
    canActivate: [AuthGaurdService],
  },
  {
    path: "logistica",
    loadChildren: () => import('./logistica/logistica.module').then(m => m.LogisticaModule),
    canActivate: [AuthGaurdService],
  },
  { path: "login", component: LoginComponent },
  {
    path: "logout",
    component: LogoutComponent,
    canActivate: [AuthGaurdService],
  },
  { path: "**", pathMatch: "full", redirectTo: "ventas" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
