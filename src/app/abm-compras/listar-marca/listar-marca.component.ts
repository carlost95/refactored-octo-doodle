import { Marca } from './../../modelo/Marca';
import { Router } from '@angular/router';
import { AbmComprasService } from './../../service/abm-compras.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-listar-marca",
  templateUrl: "./listar-marca.component.html",
  styleUrls: ["./listar-marca.component.css"]
})
export class ListarMarcaComponent implements OnInit {
  marca: Marca = null;
  marcas: Marca[] = null;
  marcaFilter: Marca[] = null;
  busquedaNombre: string = null;
  busqueda: string = null;

  constructor(private serviceAbmCompra: AbmComprasService, private router: Router) {}

  ngOnInit() {
    this.serviceAbmCompra.listarMarcaTodos().subscribe(data => {
      console.log("prueba");

      this.marcas = data.data;
      this.marcaFilter = data.data;
    });
  }
  modificarMarca(marca: Marca) {
    this.router.navigate(["abm-compras/modificar-marca/" + marca.id]);
  }
  deshabilitarMarca(marca: Marca) {
    let resultado: boolean;
    resultado = confirm("¿DESEA DESHABILITAR ESTA MARCA?");
    if (resultado === true) {
      this.serviceAbmCompra
        .desabilitarMarca(marca.id)
        .subscribe(data => {
          window.location.reload();
        });
    }
  }
  filtrarBancoNombre(event: any) {
    if (this.busqueda !== null) {
      this.marcaFilter = this.marcas.filter(item => {
        if (item.nombre.toUpperCase().includes(this.busqueda.toUpperCase())) {
          return item;
        }
      });
    } else {
      this.marcaFilter = this.marcas;
    }
  }

  filtrarBancoAbreviatura(event: any) {
    if (this.busquedaNombre !== null) {
      this.marcaFilter = this.marcas.filter(item => {
        if (
          item.abreviatura
            .toUpperCase()
            .includes(this.busquedaNombre.toUpperCase())
        ) {
          return item;
        }
      });
    } else {
      this.marcaFilter = this.marcas;
    }
  }
  backPage() {
    window.history.back();
  }
}
