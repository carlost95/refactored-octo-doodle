import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-abm-compras",
  templateUrl: "./abm-compras.component.html",
  styleUrls: ["./abm-compras.component.css"]
})
export class AbmComprasComponent implements OnInit {
  menuDeplegado = true;

  constructor(private router: Router) {}
  validaMenu() {
    if (
      this.router.url.includes("/listar-banco") ||
      this.router.url.includes("/listar-marca") ||
      this.router.url.includes("/listar-forma-pago") ||
      this.router.url.includes("/listar-unidad-medida") ||
      this.router.url.includes("/listar-rubro") ||
      this.router.url.includes("/listar-sub-rubro") ||
      this.router.url.includes("/listar-ajuste") ||
      this.router.url.includes("/agregar-banco") ||
      this.router.url.includes("/agregar-marca") ||
      this.router.url.includes("/agregar-forma-pago") ||
      this.router.url.includes("/agregar-unidad-medida") ||
      this.router.url.includes("/agregar-rubro") ||
      this.router.url.includes("/agregar-sub-rubro") ||
      this.router.url.includes("/modificar-marca") ||
      this.router.url.includes("/modificar-forma-pago") ||
      this.router.url.includes("/modificar-unidad-medida") ||
      this.router.url.includes("/modificar-banco")||
      this.router.url.includes("/modificar-rubro")||
      this.router.url.includes("/modificar-sub-rubro")
    )
      return false;
    else return true;
  }

  ngOnInit() {}
}
