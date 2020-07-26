import { Proveedor } from './../../modelo/Proveedor';
import { Articulo } from "./../../modelo/Articulo";
import { ListarArticulosComponent } from "./../listar-articulos/listar-articulos.component";
import { Router } from "@angular/router";
import { ComprasService } from "./../../service/compras.service";
import { Pedido } from "./../../modelo/Pedido";
import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";

@Component({
  selector: "app-listar-pedido",
  templateUrl: "./listar-pedido.component.html",
  styleUrls: ["./listar-pedido.component.css"]
})
export class ListarPedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidosFilter: Pedido[] = [];
  busqueda: string = null;
  busquedaFecha: string = null;
  searchDesde: string = "";
  searchHasta: string = "";
  rows: any[];
  proveedores: Proveedor[]=[];
  razonSocial: string;

  //
  //
  constructor(private serviceCompra: ComprasService, private router: Router) {}

  ngOnInit() {
    this.fetchEvent().then(() => {
      console.log(this.pedidos);
    });

  }

  fetchEvent() {
    return this.serviceCompra
      .listarPedidoTodos()
      .toPromise()
      .then(data => {
        this.pedidos = data.data;
        console.log('fechas: ');
        this.pedidosFilter = this.pedidos;

        this.pedidos.forEach((p , index)=>{
          console.log(p.fecha);
        })



      });
  }
  jsonStringDate(jdate): string {
    if (jdate != null) {
      const resp = new Date(jdate);
      return resp.toISOString().substring(0, 10);
    }
    return "";
  }
  deshabilitarPedido(pedido: Pedido) {
    let resultado: boolean;
    resultado = confirm("¿DESEA DESHABILITAR ESTE PEDIDO?");
    if (resultado === true) {
      this.serviceCompra.desabilitarPedido(pedido.id).subscribe(data => {
        window.location.reload();
      });
    }
  }
  filtarPedidoNombre(event: any) {
    if (this.busqueda !== null) {
      this.pedidosFilter = this.pedidos.filter(item => {
        if (item.nombre.toUpperCase().includes(this.busqueda.toUpperCase())) {
          return item;
        }
      });
    } else {
      this.pedidosFilter = this.pedidos;
    }
  }

  updateFilterDateDesde() {
    let val = null;
    if (this.searchDesde != null && this.searchDesde !== "") {
      val = new Date(this.searchDesde);
      this.pedidosFilter = [];
      this.pedidosFilter = this.pedidos.filter(element => {
        return new Date(element.fecha).valueOf() >= val.valueOf();
      });
    } else {
      this.pedidosFilter = this.pedidos;
    }
    this.orderRows();
  }

  updateFilterDateHasta() {
    let val = null;
    if (this.searchHasta != null && this.searchHasta !== "") {
      val = new Date(this.searchHasta);
      // filter our data
      this.pedidosFilter = this.pedidosFilter.filter(element => {
        return new Date(element.fecha).valueOf() <= val.valueOf();
      });
    } else {
      this.pedidosFilter = this.pedidos;
    }

    this.orderRows();
  }
  orderRows() {
    this.pedidosFilter = _.orderBy(this.pedidosFilter, ["fecha"], ["desc"]);
  }

  backPage() {
    window.history.back();
  }

  consultarPedido(pedido: Pedido){
    this.router.navigate(['consultar-pedido/']);
  }
}
