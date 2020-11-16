import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit, Input} from '@angular/core';
import {Pedido} from 'src/app/models/Pedido';
import {Articulo} from 'src/app/models/Articulo';
import {MovimientoArticuloDTO} from 'src/app/models/MovimientoArticuloDTO';
import {PedidosService} from 'src/app/service/pedidos.service';
import {Proveedor} from 'src/app/models/Proveedor';
import {ProveedoresService} from '../../service/proveedores.service';
import {ArticulosService} from '../../service/articulos.service';
import {MovimientosService} from '../../service/movimientos.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AjustesService} from '../../service/ajustes.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
})
export class PedidosComponent implements OnInit {
  @Input() consultar: boolean;

  pedido: Pedido = new Pedido();
  pedidoDTO: Pedido = new Pedido();
  pedidos: Pedido[] = [];
  articulos: Articulo[] = [];

  movimientoArticuloDTO: MovimientoArticuloDTO = new MovimientoArticuloDTO();
  movimientoArticulosDTO: MovimientoArticuloDTO[] = [];

  articulosFilter: Articulo[] = null;
  stockArticulo: number[] = [];
  proveedores: Proveedor[] = [];
  razonSocial = '';
  movimientoFilter: MovimientoArticuloDTO[] = [];
  movimientosPrevios: StockArticulo[] = [];
  stockArticuloPorPedido: StockArticulo[] = [];
  articulosStockMovimiento: any[] = [];
  articulosStockMovimientoFilter: any[] = [];

  proveedorId: number;
  nombreRepe: boolean;
  pedidoForm: FormGroup;
  errorInForm = false;
  submitted = false;

  constructor(private pedidoService: PedidosService,
              private articuloService: ArticulosService,
              private proveedorService: ProveedoresService,
              private movimientosService: MovimientosService,
              private route: Router,
              private active: ActivatedRoute,
              private ajusteService: AjustesService,
              private formBuilder: FormBuilder,
              public matDialog: MatDialog) {
  }

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    if (this.route.url === '/compras/agregar-pedido') {
      console.log('AGREGAR AJUSTE');
      this.pedidoForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        fecha: ['', Validators.required],
        descripcion: ['', null],
        proveedorId: ['', Validators.required],
      });
    } else {
      const idPedido = Number(this.active.snapshot.paramMap.get('id'));
      await this.pedidoService.listarPedidoId(idPedido)
        .toPromise()
        .then((data) => (this.pedido = data.data));
      this.proveedorId = this.pedido.proveedorId;

      this.pedidoForm = this.formBuilder.group({
        id: [this.pedido.id, null],
        nombre: [{value: this.pedido.nombre, disabled: this.consultar}, Validators.required],
        fecha: [{value: this.pedido.fecha, disabled: this.consultar}, Validators.required],
        descripcion: [{value: this.pedido.descripcion, disabled: this.consultar}, null],
        proveedorId: [{value: this.pedido.proveedorId, disabled: this.consultar}, Validators.required],
      });
    }
    this.pedidoService.listarPedidoTodos().subscribe(resp =>
      this.pedidos = resp.data);

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
      this.listaProveedor();
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.pedidoForm.invalid;

    if (this.errorInForm || this.nombreRepe) {
      this.pedidoForm.controls.nombre.markAsTouched();
      this.pedidoForm.controls.fecha.markAsTouched();
      this.pedidoForm.controls.descripcion.markAsTouched();
      this.pedidoForm.controls.proveedor.markAsTouched();
    } else {
      console.log('CARGA DE MOVIMIENTOS');
      this.makeDTO();
    }

  }

  // tslint:disable-next-line:typedef
  async makeDTO() {
    this.pedido = new Pedido();

    this.pedido.id = null;
    this.pedido.nombre = (this.pedidoForm.controls.nombre.value).trim();
    this.pedido.fecha = (this.pedidoForm.controls.fecha.value).trim();
    this.pedido.descripcion = (this.pedidoForm.controls.descripcion.value).trim();
    this.pedido.proveedorId = this.pedidoForm.controls.proveedorId.value;

    await this.proveedorService.listarProveedorId(this.pedido.proveedorId)
      .toPromise().then((data) => (this.pedidoDTO = data.data));
    this.pedido.razonSocial = this.pedidoDTO.razonSocial;

    console.log('pedido');
    console.warn(this.pedido);

    this.pedidoService.guardarPedidos(this.pedido).then((data) => {
      console.log(data);
      this.pedido = data.data;

      this.articulosStockMovimientoFilter.forEach((artStockMov, index) => {
        if (artStockMov.movimiento.movimiento !== null) {
          this.movimientoArticuloDTO.id = null;
          this.movimientoArticuloDTO.fecha = this.pedido.fecha;
          this.movimientoArticuloDTO.articuloId = artStockMov.articulo.id;
          this.movimientoArticuloDTO.movimiento = artStockMov.movimiento.movimiento;
          this.movimientoArticuloDTO.pedidoId = this.pedido.id;

          this.movimientosService.guardarMovimientoPedido(this.movimientoArticuloDTO)
            .subscribe((resp) => {
            });
        }
      });
    });
    this.showModal();
  }

  showModal(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '280px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: 'Se guardo un nuevo pedido',
      title: 'Carga de Pedido',
      status: 'alert'
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      window.history.back();
    });
  }

  listaProveedor(): void {
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
      const data = await this.movimientosService
        .getMovimientosPreviosPedidos(this.pedido.id)
        .toPromise();
      const keys = Object.keys(data.data);
      const value = Object.values(data.data);
      const movimientosPrev = [];
      value.forEach((v, index) => {
        const stock = new StockArticulo(Number(keys[index]), Number(v));
        movimientosPrev.push(stock);
      });
      this.movimientosPrevios = movimientosPrev;
      // tslint:disable-next-line:variable-name
      this.articulos.forEach((a, index_1) => {
        this.stockArticulo.push(data.data.id);
      });
      this.movimientosPrevios.forEach((mov) => this.stockArticulo.push(mov.stock)
      );
    } else {
      // tslint:disable-next-line: variable-name
      const data_1 = await this.movimientosService.listarStockArticuloPedido()
        .toPromise();
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
    }
  }

  volverAtras(): void {
    window.history.back();
  }

  // tslint:disable-next-line: typedef
  async listarFiltro() {
    this.articulosStockMovimientoFilter = [];
    if (this.proveedorId === null) {
      this.articulosStockMovimientoFilter = this.articulosStockMovimiento;
    } else {
      await this.articulosStockMovimiento.forEach((artStockMov) => {
        artStockMov.articulo.proveedorId.id === this.proveedorId
          // tslint:disable-next-line:no-unused-expression
          ? this.articulosStockMovimientoFilter.push(artStockMov) : false;
      });
    }
  }

  guardarCarga(): void {
    console.log('Entre');
  }

  // tslint:disable-next-line:typedef
  async getStock() {
    if (this.consultar) {
      const data = await this.movimientosService
        .getMovimientosStockPedido(this.pedido.id)
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
    }
  }

  validarNombre({target}): void {
    const {value: nombre} = target;
    const finded = this.pedidos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
    this.nombreRepe = (finded !== undefined) ? true : false;
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
