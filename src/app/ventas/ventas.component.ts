import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-ventas-component",
  templateUrl: "./ventas.component.html",
  styleUrls: ["./ventas.component.css"]
})
export class VentasComponent {
  constructor(private router: Router) {}
  validaMenu() {
    if (
      this.router.url.includes("/listar-cliente") ||
      this.router.url.includes("/agregar-cliente") ||
      this.router.url.includes("/modificar-cliente")
    )
      return false;
    else return true;
  }
}
