import { ComprasService } from "./../../service/compras.service";
import { Proveedor } from "./../../modelo/Proveedor";
import { Router } from "@angular/router";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.css']
})
export class ListarProveedorComponent implements OnInit {
  proveedor: Proveedor = null;
  proveedores: Proveedor[] = null;
  proveedoresFilter: Proveedor[] = null;
  busquedaTelefono: string = null;
  busqueda: string = null;
  busquedaMail: string = null;

  constructor(private router: Router, private serviceCompras: ComprasService) { }

  ngOnInit() {
    this.serviceCompras.listarProveedoresTodos().subscribe(prov => {
      this.proveedores = prov.data;
      this.proveedoresFilter = prov.data;
    });
  }
  filtrarProveedorRazonSocial(event: any) {
    if (this.busqueda !== null) {
      this.proveedoresFilter = this.proveedores.filter(item => {
        if (
          item.razonSocial.toUpperCase().includes(this.busqueda.toUpperCase())
        ) {
          return item;
        }
      });
    } else {
      this.proveedoresFilter = this.proveedores;
    }
  }
  // filtrarProveedorTelefono(event: any) {
  //   if (this.busquedaTelefono !== null) {
  //     this.proveedoresFilter = this.proveedores.filter(item => {
  //       if (
  //         item.telefono
  //           .toUpperCase()
  //           .includes(this.busquedaTelefono.toUpperCase())
  //       ) {
  //         return item;
  //       }
  //     });
  //   } else {
  //     this.proveedoresFilter = this.proveedores;
  //   }
  // }
  // filtrarProveedorMail(event: any) {
  //   if (this.busquedaMail !== null) {
  //     this.proveedoresFilter = this.proveedores.filter(item => {
  //       if (item.mail.toUpperCase().includes(this.busquedaMail.toUpperCase())) {
  //         return item;
  //       }
  //     });
  //   } else {
  //     this.proveedoresFilter = this.proveedores;
  //   }
  // }
  modificarProveedor() { }
  deshabilitarProveedor() { }
  backPage() {
    window.history.back();
  }
}
