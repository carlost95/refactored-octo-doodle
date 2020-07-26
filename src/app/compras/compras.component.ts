import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-compras",
  templateUrl: "./compras.component.html",
  styleUrls: ["./compras.component.css"]
})
export class ComprasComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  validaMenu() {
    if (
      this.router.url.includes("/listar-proveedor") ||
      this.router.url.includes("/listar-articulos") ||
      this.router.url.includes("/listar-pedido") ||
      this.router.url.includes("/agregar-proveedor") ||
      this.router.url.includes("/agregar-articulo") ||
      this.router.url.includes("/agregar-pedido") ||
      this.router.url.includes("/modificar-articulo")||
      this.router.url.includes("/consultar-pedido")
    )
      return false;
    else return true;
  }
}
