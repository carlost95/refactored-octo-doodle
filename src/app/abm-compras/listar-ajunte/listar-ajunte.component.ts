import { Proveedor } from './../../modelo/Proveedor';
import { AbmComprasService } from './../../service/abm-compras.service';
import { Router } from '@angular/router';
import { ComprasService } from './../../service/compras.service';
import { Ajuste } from './../../modelo/Ajuste';
import { Component, OnInit } from '@angular/core';
import * as _ from "lodash";


@Component({
  selector: 'app-listar-ajunte',
  templateUrl: './listar-ajunte.component.html',
  styleUrls: ['./listar-ajunte.component.css']
})
export class ListarAjunteComponent implements OnInit {
  ajustes: Ajuste[] = [];
  ajustesFilter: Ajuste[] = [];
  busqueda: string = null;
  busquedaFecha: string = null;
  searchDesde: string = "";
  searchHasta: string = "";
  rows: any[];
  proveedores: Proveedor[]=[];
  razonSocial: string;

   constructor(private serviceCompra: ComprasService, private serviceAbmCompra: AbmComprasService, private router: Router) {}

   ngOnInit() {
    this.fetchEvent().then(() => {
      console.log(this.ajustes);
    });

   }

  fetchEvent() {
    return this.serviceAbmCompra.listarAjustesTodos()
      .toPromise()
      .then(data => {
        this.ajustes = data.data;
        this.ajustesFilter = this.ajustes;

        this.ajustes.forEach((p , index)=>{
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
  // deshabilitarPedido(pedido: Pedido) {
  //   let resultado: boolean;
  //   resultado = confirm("¿DESEA DESHABILITAR ESTE PEDIDO?");
  //   if (resultado === true) {
  //     this.serviceCompra.desabilitarPedido(pedido.id).subscribe(data => {
  //       window.location.reload();
  //     });
  //   }
  // }
  filtarAjusteNombre(event: any) {
    if (this.busqueda !== null) {
      this.ajustesFilter = this.ajustes.filter(item => {
        if (item.nombre.toUpperCase().includes(this.busqueda.toUpperCase())) {
          return item;
        }
      });
    } else {
      this.ajustesFilter = this.ajustes;
    }
  }

  updateFilterDateDesde() {
    let val = null;
    if (this.searchDesde != null && this.searchDesde !== "") {
      val = new Date(this.searchDesde);
      this.ajustesFilter = [];
      this.ajustesFilter = this.ajustes.filter(element => {
        return new Date(element.fecha).valueOf() >= val.valueOf();
      });
    } else {
      this.ajustesFilter = this.ajustes;
    }
    this.orderRows();
  }

  updateFilterDateHasta() {
    let val = null;
    if (this.searchHasta != null && this.searchHasta !== "") {
      val = new Date(this.searchHasta);
      this.ajustesFilter = this.ajustesFilter.filter(element => {
        return new Date(element.fecha).valueOf() <= val.valueOf();
      });
    } else {
      this.ajustesFilter = this.ajustes;
    }

    this.orderRows();
  }
  orderRows() {
    this.ajustesFilter = _.orderBy(this.ajustesFilter, ["fecha"], ["desc"]);
  }

  backPage() {
    window.history.back();
  }

  consultarAjuste(ajuste: Ajuste){
    this.router.navigate(['consultar-ajuste/']);
  }
}
