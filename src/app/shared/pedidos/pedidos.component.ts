import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from 'src/app/modelo/Pedido';
import { Articulo } from 'src/app/modelo/Articulo';
import { MovimientoArticuloDTO } from 'src/app/modelo/MovimientoArticuloDTO';
import { ComprasService } from 'src/app/service/compras.service';
import { Proveedor } from 'src/app/modelo/Proveedor';
import { ProveedoresService } from '../../service/proveedores.service';
import { proveedor } from '../../../environments/global-route';
import {ArticulosService} from '../../service/articulos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
  @Input() consultar: boolean;

  pedido: Pedido = new Pedido();

  articulos: Articulo[] = [];

  movimientoArticuloDTO: MovimientoArticuloDTO = new MovimientoArticuloDTO();
  movimientoArticulosDTO: MovimientoArticuloDTO[] = [];

  articulosFilter: Articulo[] = null;
  stockArticulo: number[] = [];
  proveedores: Proveedor[] = [];
  // tslint:disable-next-line: ban-types
  razonSocial: String = '';
  movimientoFilter: MovimientoArticuloDTO[] = [];
  movimientosPrevios: StockArticulo[] = [];
  stockArticuloPorPedido: StockArticulo[] = [];

  articulosStockMovimiento: any[] = [];
  articulosStockMovimientoFilter: any[] = [];

  constructor(
    private comprasService: ComprasService,
    private articuloService: ArticulosService,
    private proveedorService: ProveedoresService,
    private route: Router,
    private active: ActivatedRoute
  ) { }

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    if (this.route.url === '/compras/agregar-pedido') {
      console.log('agregar');
    }
    else {
      const idPedido = Number(this.active.snapshot.paramMap.get('id'));
      await this.comprasService
        .listarPedidoId(idPedido)
        .toPromise()
        .then((data) => (this.pedido = data.data));
    }

    await this.getArticulos().then(() => {
      this.articulos.forEach((a, index) => {
        this.movimientoArticulosDTO.push(new MovimientoArticuloDTO());
        this.movimientoArticulosDTO[index].movimiento = null;
        this.movimientoArticulosDTO[index].articuloId = a.id;
        this.movimientoFilter = this.movimientoArticulosDTO;
      });
    });

    this.getMovimientos().then(() => {
      this.getStock();
    });

    this.listaProveedor();
    //
  }
  // tslint:disable-next-line: typedef
  guardarPedido(pedido: Pedido) {
    // console.log(this.articulosStockMovimientoFilter);
    this.pedido.id = null;
    this.pedido.nombre = pedido.nombre.toUpperCase().trim();
    this.pedido.fecha = pedido.fecha;

    this.proveedores.forEach(prov => {
      if (this.razonSocial === prov.razonSocial) {
        pedido.proveedorId = prov.id;
        pedido.razonSocial = prov.razonSocial;
      }
    });
    this.pedido.proveedorId = pedido.proveedorId;

    console.warn('--------------MUESTRA DE ID PROVEEDOR------------');
    console.error(this.pedido.proveedorId);


    this.pedido.descripcion = pedido.descripcion.toUpperCase();

    this.comprasService.guardarPedidos(this.pedido).then((data) => {
      console.log(data);

      this.pedido = data.data;

      this.articulosStockMovimientoFilter.forEach((artStockMov, index) => {
        if (artStockMov.movimiento.movimiento !== null) {
          this.movimientoArticuloDTO.id = null;
          this.movimientoArticuloDTO.fecha = pedido.fecha;
          this.movimientoArticuloDTO.articuloId = artStockMov.articulo.id; // this.articulos[index].id;
          this.movimientoArticuloDTO.movimiento =
            artStockMov.movimiento.movimiento; // this.movimientoArticulosDTO[index].movimiento;
          this.movimientoArticuloDTO.pedidoId = data.data.id;

          this.comprasService
            .guardarMovimiento(this.movimientoArticuloDTO)
            .subscribe((resp) => {
              console.log('Ingreso a los movimientos');
            });
        }
      });
    });

    alert('Se guardo un nuevo pedido');
    window.history.back();
  }

  // tslint:disable-next-line: typedef
  listaProveedor() {
    this.proveedorService.listarProveedoresHabilitados().subscribe((data) => {
      this.proveedores = data.data;
      this.proveedores.sort(
        (a, b) => a.razonSocial.length - b.razonSocial.length
      );
    });
  }

  // tslint:disable-next-line: typedef
  async getArticulos() {
    const data = await this.articuloService.listarArticuloHabilitados()
      .toPromise();
    this.articulos = data.data;
    this.articulosFilter = this.articulos;
  }

  // tslint:disable-next-line: typedef
  async getMovimientos() {
    if (this.consultar) {
      const data = await this.comprasService
        .getMovimientosPrevios(this.pedido.id)
        .toPromise();
      console.log('getMovimientosPrevios');
      const keys = Object.keys(data.data);
      const value = Object.values(data.data);
      const movimientosPrev = [];
      value.forEach((v, index) => {
        const stock = new StockArticulo(Number(keys[index]), Number(v));
        movimientosPrev.push(stock);
      });
      console.log('movimivneto previo-------');
      console.log(movimientosPrev);
      // movimientosPrev = movimientosPrev.filter( m => m.stock !== 0);
      this.movimientosPrevios = movimientosPrev;
      console.log(movimientosPrev);
      this.articulos.forEach((a, index_1) => {
        this.stockArticulo.push(data.data.id);
      });
      this.movimientosPrevios.forEach((mov) => this.stockArticulo.push(mov.stock)
      );
    } else {
      // tslint:disable-next-line: variable-name
      const data_1 = await this.articuloService
        .listarStockArticulo()
        .toPromise();
      console.log('lista');
      // tslint:disable-next-line: variable-name
      this.articulos.forEach((a_1, index_2) => {
        this.stockArticulo.push(data_1.data[index_2]);
        this.articulosStockMovimiento.push({
          articulo: a_1,
          stock: data_1.data[index_2],
          movimiento: this.movimientoFilter[index_2],
        });
        this.articulosStockMovimientoFilter = this.articulosStockMovimiento;
      });
      console.log(this.articulosStockMovimiento);
      console.log(this.stockArticulo);
    }
  }

  // tslint:disable-next-line: typedef
  volverAtras() {
    window.history.back();
  }

  // tslint:disable-next-line: typedef
  async listarFiltro() {
    this.articulosStockMovimientoFilter = [];
    if (this.razonSocial === null) {
      this.articulosStockMovimientoFilter = this.articulosStockMovimiento;
    } else {
      await this.articulosStockMovimiento.forEach((artStockMov) => {
        artStockMov.articulo.proveedorId.razonSocial === this.razonSocial
          ? this.articulosStockMovimientoFilter.push(artStockMov) : false;
      });
    }
  }

  // tslint:disable-next-line: typedef
  async actualizarStockFiltro(articulosFilter: Articulo[]) {
    this.stockArticulo = [];
    const data = await this.articuloService
      .listarStockArticulo()
      .toPromise();
    articulosFilter.forEach((a, index) => {
      this.stockArticulo.push(data.data[a.id]);
    });
  }

  guardarCarga() {
    console.log('Entre');
  }

  async getStock() {
    if (this.consultar) {
      const data = await this.comprasService
        .getMovimientosStock(this.pedido.id)
        .toPromise();
      const keys = Object.keys(data.data);
      const value = Object.values(data.data);
      keys.forEach((k, index) => this.stockArticuloPorPedido.push(
        new StockArticulo(Number(k), Number(value[index]))
      )
      );
      this.movimientoFilter = [];
      keys.forEach((k_1, index_1) => {
        const mov = new MovimientoArticuloDTO();
        mov.articuloId = Number(k_1);
        mov.movimiento = Number(value[index_1]);
        this.movimientoFilter.push(mov);
      });
      const indexMovpre = [];
      this.movimientoFilter.forEach((p) => indexMovpre.push(p.articuloId));
      this.movimientosPrevios = this.movimientosPrevios.filter((m) => indexMovpre.includes(m.idArticulo)
      );
      this.stockArticulo.splice(0, this.stockArticulo.length);
      this.movimientosPrevios.forEach((m_1) => this.stockArticulo.push(m_1.stock)
      );
      this.articulosFilter = this.articulosFilter.filter((a) => keys.includes(String(a.id))
      );
      this.articulosFilter.forEach((a_1, index_2) => {
        this.articulosStockMovimiento.push({
          articulo: a_1,
          stock: this.stockArticulo[index_2],
          movimiento: this.movimientoFilter[index_2],
        });
        this.articulosStockMovimientoFilter = this.articulosStockMovimiento;
      });
      console.error(this.articulosStockMovimiento);
      console.error('Soy un fucking error ');
    }
  }
}

export class StockArticulo {
  idArticulo: number;
  stock: number;
  constructor(idArticulo: number, stock: number) {
    this.idArticulo = idArticulo;
    this.stock = stock;
  }
}
