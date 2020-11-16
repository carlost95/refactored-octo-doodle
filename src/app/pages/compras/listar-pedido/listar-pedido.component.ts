import {Proveedor} from '../../../models/Proveedor';
import {Router} from '@angular/router';
import {PedidosService} from '../../../service/pedidos.service';
import {Pedido} from '../../../models/Pedido';
import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import {SnackConfirmComponent} from '../../../shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TokenService} from '../../../service/token.service';

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

  isLogged = false;
  roles: string[];
  isAdmin = false;
  isGerente = false;

  constructor(private pedidoService: PedidosService,
              private router: Router,
              private snackBar: MatSnackBar,
              private tokenService: TokenService) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      } else if (rol === 'ROLE_GERENTE') {
        this.isGerente = true;
      }
    });
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

  filtarPedido(event: any): void {
    if (this.busqueda !== null) {
      this.pedidosFilter = this.pedidos.filter(item => {
          const inName = item.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
          const inLastName = item.razonSocial.toLowerCase().indexOf(this.busqueda) !== -1;
          return inName || inLastName;
        }
      );
    }
  }

  updateFilterDateDesde(): void {
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

  updateFilterDateHasta(): void {
    let val = null;
    if (this.searchHasta != null && this.searchHasta !== '') {
      val = new Date(this.searchHasta);
      this.pedidosFilter = this.pedidosFilter.filter(element => {
        return new Date(element.fecha).valueOf() <= val.valueOf();
      });
    } else {
      this.pedidosFilter = this.pedidos;
    }

    this.orderRows();
  }

  orderRows(): void {
    this.pedidosFilter = _.orderBy(this.pedidosFilter, ['fecha'], ['desc']);
  }

  backPage(): void {
    this.router.navigate(['compras']);
  }

  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
}
