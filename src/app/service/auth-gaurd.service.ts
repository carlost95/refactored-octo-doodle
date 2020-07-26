import { AutenticacionService } from "./autenticacion.service";
import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGaurdService implements CanActivate {
  constructor(
    private router: Router,
    private autenticacion: AutenticacionService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.autenticacion.usuarioLogeado()) return true;

    this.router.navigate(["login"]);
    return false;
  }
}
