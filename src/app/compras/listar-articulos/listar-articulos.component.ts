import { Router } from "@angular/router";
import { ComprasService } from "./../../service/compras.service";
import { Articulo } from "./../../modelo/Articulo";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ExcelExportService } from "../../service/excel-export.service";
import { ArticuloExcel } from "../../modelo/ArticuloExcel";
import { async } from "@angular/core/testing";

@Component({
  selector: "app-listar-articulos",
  templateUrl: "./listar-articulos.component.html",
  styleUrls: ["./listar-articulos.component.css"],
})
export class ListarArticulosComponent implements OnInit {
  @ViewChild("listArt") content: ElementRef;

  articulos: Articulo[] = [];
  articulosFilter: Articulo[] = [];

  articulosExcel: ArticuloExcel[] = [];

  articuloExcel: ArticuloExcel;

  busqueda: string = null;
  busquedaRubro: string = null;
  busquedaCodigo: string = null;
  loaded: boolean = false;

  export: boolean = true;
  constructor(
    private serviceCompra: ComprasService,
    private router: Router,
    private excelService: ExcelExportService
  ) { }

  ngOnInit() {
    this.fetchEvent().then(() => {
      console.log(this.articulos);
    });
    localStorage.clear();
    localStorage.setItem("listar", "true");
  }

  fetchEvent() {
    return this.serviceCompra
      .listarArticuloTodos()
      .toPromise()
      .then((data) => {
        // subscribe(data => {
        this.articulos = data.data;
        this.articulosFilter = this.articulos;
        // console.info("Articulos");
        // console.info(data.data);
        // console.info("ArticulosFilter");

        // console.info(this.articulosFilter);
      });
  }

  modificarArticulo(articulo: Articulo) {
    this.router.navigate(["compras/modificar-articulo/" + articulo.id]);
  }
  deshabilitarArticulo(articulo: Articulo) {
    let resultado: boolean;
    resultado = confirm("¿DESEA DESHABILITAR ESTE ARTICULO?");
    if (resultado === true) {
      this.serviceCompra.desabilitarArticulo(articulo.id).subscribe((data) => {
        window.location.reload();
      });
    }
  }
  filtrarArticulo() {
    console.log(this.busqueda);

    this.busqueda = this.busqueda.toLowerCase();
    this.articulosFilter = this.articulos;

    if (this.busqueda !== null) {
      this.articulosFilter = this.articulos.filter((item) => {
        const inName = item.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
        const inLastName =
          item.codigoArt.toLowerCase().indexOf(this.busqueda) !== -1;
        const inDocument =
          item.rubroId.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
        return inName || inLastName || inDocument;
      });
    }
  }
  // filtrarArticuloNombre(event: any) {
  //   if (this.busqueda !== null) {
  //     this.articulosFilter = this.articulos.filter((item) => {
  //       if (item.nombre.toUpperCase().includes(this.busqueda.toUpperCase())) {
  //         return item;
  //       }
  //     });
  //   } else {
  //     this.articulosFilter = this.articulos;
  //   }
  // }
  // filtrarArticuloCodigo(event: any) {
  //   if (this.busquedaCodigo !== null) {
  //     this.articulosFilter = this.articulos.filter((item) => {
  //       if (
  //         item.codigoArt
  //           .toUpperCase()
  //           .includes(this.busquedaCodigo.toUpperCase())
  //       ) {
  //         return item;
  //       }
  //     });
  //   } else {
  //     this.articulosFilter = this.articulos;
  //   }
  // }
  // filtrarArticuloRubro(event: any) {
  //   console.log("================ENTRO================");

  //   if (this.busquedaRubro !== null) {
  //     this.articulosFilter = this.articulos.filter((item) => {
  //       if (item.rubroId !== null) {
  //         if (
  //           item.rubroId.nombre
  //             .toUpperCase()
  //             .includes(this.busquedaRubro.toUpperCase())
  //         ) {
  //           return item;
  //         }
  //       }
  //     });
  //   } else {
  //     this.articulosFilter = this.articulos;
  //   }
  // }

  backPage() {
    window.history.back();
  }
  exportarPDF() {
    const promesa = new Promise((resp, error) => {
      this.export = true;
      console.log("LOG 1");

      resp();
    })
      .then(async (resp) => {
        console.log("LOG 2");

        const doc = new jsPDF();
        doc.autoTable({ html: "#listArt" });
        await doc.save("table.pdf");
      })
      .then(() => {
        console.log("LOG 3");

        this.export = false;
      });
  }
  exportarExcel(): void {
    console.warn("arreglo--");

    console.log(this.articulosFilter);

    for (let index = 0; index < this.articulosFilter.length; index++) {
      this.articuloExcel = new ArticuloExcel("", "", 0, 0);
      console.warn("----------------------");
      console.log(this.articulosFilter[index]);

      if (this.articulosFilter[index] != null) {
        console.warn("ENTRO");

        this.articuloExcel.codigoArt = this.articulosFilter[index].codigoArt;
        this.articuloExcel.nombre = this.articulosFilter[index].nombre;
        this.articuloExcel.stockMin = this.articulosFilter[index].stockMin;
        this.articuloExcel.stockMax = this.articulosFilter[index].stockMax;
      }
      this.articulosExcel.push(this.articuloExcel);
    }

    this.excelService.exportToExcel(this.articulosExcel, "lista_articulos");
  }
}
