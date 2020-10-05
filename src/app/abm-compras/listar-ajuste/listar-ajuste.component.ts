import { Proveedor } from '../../modelo/Proveedor';
import { AbmComprasService } from '../../service/abm-compras.service';
import { Router } from '@angular/router';
import { ComprasService } from '../../service/compras.service';
import { Ajuste } from '../../modelo/Ajuste';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {AjustesService} from '../../service/ajustes.service';


@Component({
  selector: 'app-listar-ajuste',
  templateUrl: './listar-ajuste.component.html',
  styleUrls: []
})
export class ListarAjusteComponent implements OnInit {
  ajustes: Ajuste[] = [];
  ajustesFilter: Ajuste[] = [];
  busqueda: string = null;
  busquedaFecha: string = null;
  searchDesde = '';
  searchHasta = '';
  rows: any[];
  proveedores: Proveedor[] = [];
  razonSocial: string;

  constructor(private serviceCompra: ComprasService,
              private serviceAbmCompra: AbmComprasService,
              private router: Router,
              private ajusteService: AjustesService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.fetchEvent().then(() => {
      console.log(this.ajustes);
    });

  }

  // tslint:disable-next-line:typedef
  fetchEvent() {
    return this.ajusteService.listarAjusteTodos()
      .toPromise()
      .then(data => {
        this.ajustes = data.data;
        this.ajustesFilter = this.ajustes;

        this.ajustes.forEach((p, index) => {
          console.log(p.fecha);
        });
      });
  }
  jsonStringDate(jdate): string {
    if (jdate != null) {
      const resp = new Date(jdate);
      return resp.toISOString().substring(0, 10);
    }
    return '';
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

  // tslint:disable-next-line:typedef
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

  // tslint:disable-next-line:typedef
  updateFilterDateDesde() {
    let val = null;
    if (this.searchDesde != null && this.searchDesde !== '') {
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

  // tslint:disable-next-line:typedef
  updateFilterDateHasta() {
    let val = null;
    if (this.searchHasta != null && this.searchHasta !== '') {
      val = new Date(this.searchHasta);
      this.ajustesFilter = this.ajustesFilter.filter(element => {
        return new Date(element.fecha).valueOf() <= val.valueOf();
      });
    } else {
      this.ajustesFilter = this.ajustes;
    }

    this.orderRows();
  }
  // tslint:disable-next-line:typedef
  orderRows() {
    this.ajustesFilter = _.orderBy(this.ajustesFilter, ['fecha'], ['desc']);
  }

  // tslint:disable-next-line:typedef
  backPage() {
    window.history.back();
  }

  // tslint:disable-next-line:typedef
  consultarAjuste(ajuste: Ajuste) {
    this.router.navigate(['consultar-ajuste/']);
  }
  // tslint:disable-next-line:typedef
  filtarPedidoProveedor({ target }) {

  }
}
