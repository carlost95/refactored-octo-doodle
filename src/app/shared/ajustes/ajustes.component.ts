import {Component, OnInit, Input} from '@angular/core';
import {MovimientoArticuloDTO} from '../../modelo/MovimientoArticuloDTO';
import {Ajuste} from '../../modelo/Ajuste';
import {ComprasService} from '../../service/compras.service';
import {ProveedoresService} from '../../service/proveedores.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AjustesService} from '../../service/ajustes.service';
import {Articulo} from '../../modelo/Articulo';
import {Proveedor} from '../../modelo/Proveedor';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {
  @Input() consultar: boolean;

  ajuste: Ajuste = new Ajuste();
  busqueda = '';

  articulos: Articulo[] = [];

  movimientoArticuloDTO: MovimientoArticuloDTO = new MovimientoArticuloDTO();
  movimientoArticulosDTO: MovimientoArticuloDTO[] = [];

  articulosFilter: Articulo[] = null;
  stockArticulo: number[] = [];
  proveedores: Proveedor[] = [];
  // tslint:disable-next-line: ban-types
  proveedorSelect: String = '';
  movimientoFilter: MovimientoArticuloDTO[] = [];
  movimientosPrevios: StockArticulo[] = [];
  stockArticuloPorPedido: StockArticulo[] = [];

  articulosStockMovimiento: any[] = [];
  articulosStockMovimientoFilter: any[] = [];

  constructor(
    private comprasService: ComprasService,
    private proveedorService: ProveedoresService,
    private route: Router,
    private active: ActivatedRoute,
    private ajusteService: AjustesService
  ) {
  }

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    if (this.route.url === '/abm-compras/agregar-ajuste') {
      console.log('agregar');
    } else {
      const idAjuste = Number(this.active.snapshot.paramMap.get('id'));
      await this.ajusteService.listarAjusteId(idAjuste)
        .toPromise()
        .then((data) => (this.ajuste = data.data));
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

    // this.listaProveedor();
  }

  // tslint:disable-next-line: typedef
  guardarAjuste(ajuste: Ajuste) {
    // console.log(this.articulosStockMovimientoFilter);
    this.ajuste.id = null;
    this.ajuste.nombre = ajuste.nombre.toUpperCase().trim();
    this.ajuste.fecha = ajuste.fecha;

    this.proveedores.forEach(prov => {
      // if (this.proveedorSelect === prov.razonSocial) {
      //   ajuste.proveedorId = prov.id;
      //   ajuste.razonSocial = prov.razonSocial;
      // }
    });
    // this.ajuste.proveedorId = ajuste.proveedorId;

    this.ajuste.descripcion = ajuste.descripcion.toUpperCase();
    this.ajusteService.guardarAjuste(this.ajuste).then((data) => {
      console.log(data);

      this.ajuste = data.data;

      this.articulosStockMovimientoFilter.forEach((artStockMov, index) => {
        if (artStockMov.movimiento.movimiento !== null) {
          this.movimientoArticuloDTO.id = null;
          this.movimientoArticuloDTO.fecha = ajuste.fecha;
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

    alert('Se guardo un nuevo ajuste');
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
    const data = await this.comprasService.listarArticuloHabilitados()
      .toPromise();
    this.articulos = data.data;
    this.articulosFilter = this.articulos;
  }

  // tslint:disable-next-line: typedef
  async getMovimientos() {
    if (this.consultar) {
      const data = await this.comprasService
        .getMovimientosPrevios(this.ajuste.id)
        .toPromise();
      console.log('getMovimientosPrevios');
      const keys = Object.keys(data.data);
      const value = Object.values(data.data);
      const movimientosPrev = [];
      value.forEach((v, index) => {
        const stock = new StockArticulo(Number(keys[index]), Number(v));
        movimientosPrev.push(stock);
      });
      // console.log('---------movimiento previo-------');
      // console.log(movimientosPrev);
      // movimientosPrev = movimientosPrev.filter( m => m.stock !== 0);
      this.movimientosPrevios = movimientosPrev;
      // console.log(movimientosPrev);
      // tslint:disable-next-line:variable-name
      this.articulos.forEach((a, index_1) => {
        this.stockArticulo.push(data.data.id);
      });
      this.movimientosPrevios.forEach((mov) => this.stockArticulo.push(mov.stock)
      );
    } else {
      // tslint:disable-next-line: variable-name
      const data_1 = await this.comprasService
        .listarStockArticulo()
        .toPromise();
      // console.log('lista');
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
      // console.log(this.articulosStockMovimiento);
      // console.log(this.stockArticulo);
    }
  }

  // tslint:disable-next-line: typedef
  volverAtras() {
    window.history.back();
  }

  // tslint:disable-next-line: typedef
  async listarFiltro() {
    this.articulosStockMovimientoFilter = [];
    if (this.proveedorSelect === null) {
      this.articulosStockMovimientoFilter = this.articulosStockMovimiento;
    } else {
      await this.articulosStockMovimiento.forEach((artStockMov) => {
        artStockMov.articulo.proveedorId.razonSocial === this.proveedorSelect
          // tslint:disable-next-line:no-unused-expression
          ? this.articulosStockMovimientoFilter.push(artStockMov) : false;
      });
    }
  }

  // tslint:disable-next-line: typedef
  async actualizarStockFiltro(articulosFilter: Articulo[]) {
    this.stockArticulo = [];
    const data = await this.comprasService
      .listarStockArticulo()
      .toPromise();
    articulosFilter.forEach((a, index) => {
      this.stockArticulo.push(data.data[a.id]);
    });
  }

  // tslint:disable-next-line: typedef
  guardarCarga() {
    console.log('Entre');
  }

  // tslint:disable-next-line: typedef
  async getStock() {
    if (this.consultar) {
      const data = await this.comprasService
        .getMovimientosStock(this.ajuste.id)
        .toPromise();
      const keys = Object.keys(data.data);
      const value = Object.values(data.data);
      keys.forEach((k, index) => this.stockArticuloPorPedido.push(
        new StockArticulo(Number(k), Number(value[index]))
        )
      );
      this.movimientoFilter = [];
      // tslint:disable-next-line:variable-name
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
      // tslint:disable-next-line:variable-name
      this.movimientosPrevios.forEach((m_1) => this.stockArticulo.push(m_1.stock)
      );
      this.articulosFilter = this.articulosFilter.filter((a) => keys.includes(String(a.id))
      );
      // tslint:disable-next-line:variable-name
      this.articulosFilter.forEach((a_1, index_2) => {
        this.articulosStockMovimiento.push({
          articulo: a_1,
          stock: this.stockArticulo[index_2],
          movimiento: this.movimientoFilter[index_2],
        });
        this.articulosStockMovimientoFilter = this.articulosStockMovimiento;
      });
      console.error(this.articulosStockMovimiento);
      console.error(' error ');
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
