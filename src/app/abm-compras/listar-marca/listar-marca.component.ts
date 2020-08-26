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

  constructor(private serviceAbmCompra: AbmComprasService, private router: Router) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.serviceAbmCompra.listarMarcaTodos().subscribe(data => {
      this.marcas = data.data;
      this.marcaFilter = data.data;
    });
  }
  // tslint:disable-next-line: typedef
  modificarMarca(marca: Marca) {
    this.router.navigate(['abm-compras/modificar-marca/' + marca.id]);
  }
  // tslint:disable-next-line: typedef
  deshabilitarMarca(marca: Marca) {
    let resultado: boolean;
    resultado = confirm('¿Decea deshabilitar esta marca?');
    if (resultado === true) {
      this.serviceAbmCompra
        .desabilitarMarca(marca.id)
        .subscribe(data => {
          window.location.reload();
        });
    }
  }
  // tslint:disable-next-line: typedef
  filtrar(event: any) {
    this.busqueda = this.busqueda.toLowerCase();
    this.marcaFilter = this.marcas;
    if (this.busqueda !== null) {
      this.marcaFilter = this.marcas.filter(item => {
        const inName = item.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
        const inLastName =
          item.abreviatura.toLowerCase().indexOf(this.busqueda) !== -1;
        return inName || inLastName;
      });
    }
  }
  // tslint:disable-next-line: typedef
  exportarPDF() { }
  // tslint:disable-next-line: typedef
  exportarExcel() { }

  // tslint:disable-next-line: typedef
  backPage() {
    window.history.back();
  }
}
