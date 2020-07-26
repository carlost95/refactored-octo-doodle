import { Response } from "./../../modelo/Response";
import { ComprasService } from "./../../service/compras.service";
import { Proveedor } from "./../../modelo/Proveedor";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-agregar-proveedor",
  templateUrl: "./agregar-proveedor.component.html",
  styleUrls: ["./agregar-proveedor.component.css"]
})
export class AgregarProveedorComponent implements OnInit {
  proveedor: Proveedor = new Proveedor();
  response: Response;
  constructor(private comprasService: ComprasService) {}

  ngOnInit() {}

  // guardarProveedor(proveedor: Proveedor) {
  //   console.log("muestra de Proveedor===>");
  //   this.proveedor.id = null;
  //   console.log(proveedor);

  //   // this.proveedor.id = null;
  //   this.proveedor.razonSocial = this.proveedor.razonSocial.toUpperCase();
  //   this.proveedor.domicilio = this.proveedor.domicilio.toUpperCase();
  //   this.proveedor.habilitacion= 1;
  //   this.comprasService.guardarProveedor(this.proveedor).subscribe(data => {
  //     this.proveedor = data;
  //     alert("SE GUARDO UN NUEVO PROVEEDOR");
  //     window.history.back();
  //   });
  // }
  guardarProveedor(proveedot: Proveedor) {
    console.log(this.proveedor);
    this.proveedor.habilitado = 1;
    this.proveedor.id = null;
    this.comprasService.guardarProveedor(this.proveedor).subscribe(data => {
      this.proveedor = data;
      alert("se guardo un nuevo proveedor");
      window.history.back();
    });
  }
  cancelar() {
    window.history.back();
  }
}
