import {Proveedor} from '../../../modelo/Proveedor';
import {Router} from '@angular/router';
import {PedidosService} from '../../../service/pedidos.service';
import {Pedido} from '../../../modelo/Pedido';
import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.css']
})
export class ListarPedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  pedidosFilter: Pedido[] = [];
  busqueda: string = null;
  searchDesde = '';
  searchHasta = '';
  proveedores: Proveedor[] = [];
  razonSocial: string;

  //
  //
  constructor(private pedidoService: PedidosService, private router: Router) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.fetchEvent().then(() => {
      console.log(this.pedidos);
    });

  }

  // tslint:disable-next-line: typedef
  async fetchEvent() {
    const data = await this.pedidoService
      .listarPedidoTodos()
      .toPromise();
    this.pedidos = data.data;
    this.pedidosFilter = this.pedidos;
    this.pedidos.forEach((p, index) => {
    });
  }

  jsonStringDate(jdate): string {
    if (jdate != null) {
      const resp = new Date(jdate);
      return resp.toISOString().substring(0, 10);
    }
    return '';
  }

  // tslint:disable-next-line: typedef
  filtarPedido(event: any) {
    if (this.busqueda !== null) {
      this.pedidosFilter = this.pedidos.filter(item => {
          const inName = item.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
          const inLastName = item.razonSocial.toLowerCase().indexOf(this.busqueda) !== -1;
          return inName || inLastName;
        }
      );
    }
  }

  // tslint:disable-next-line: typedef
  updateFilterDateDesde() {
    let val = null;
    if (this.searchDesde != null && this.searchDesde !== '') {
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

  // tslint:disable-next-line: typedef
  updateFilterDateHasta() {
    let val = null;
    if (this.searchHasta != null && this.searchHasta !== '') {
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

  // tslint:disable-next-line: typedef
  orderRows() {
    this.pedidosFilter = _.orderBy(this.pedidosFilter, ['fecha'], ['desc']);
  }

  // tslint:disable-next-line: typedef
  backPage() {
    window.history.back();
  }

}
