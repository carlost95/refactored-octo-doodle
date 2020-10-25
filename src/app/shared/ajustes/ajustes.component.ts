import {Component, OnInit, Input} from '@angular/core';
import {MovimientoArticuloDTO} from '../../modelo/MovimientoArticuloDTO';
import {Ajuste} from '../../modelo/Ajuste';
import {PedidosService} from '../../service/pedidos.service';
import {ProveedoresService} from '../../service/proveedores.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AjustesService} from '../../service/ajustes.service';
import {Articulo} from '../../modelo/Articulo';
import {Proveedor} from '../../modelo/Proveedor';
import {ArticulosService} from '../../service/articulos.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MovimientosService} from '../../service/movimientos.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../confirm-modal/confirm-modal.component';


const input = Input();

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.css']
})
export class AjustesComponent implements OnInit {

  @Input() consultar: boolean;

  ajuste: Ajuste = new Ajuste();
  ajustes: Ajuste [] = [];
  busqueda = '';

  articulos: Articulo[] = [];

  movimientoArticuloDTO: MovimientoArticuloDTO = new MovimientoArticuloDTO();
  movimientoArticulosDTO: MovimientoArticuloDTO[] = [];

  articulosFilter: Articulo[] = null;
  stockArticulo: number[] = [];
  proveedores: Proveedor[] = [];
  // tslint:disable-next-line: ban-types
  proveedorID: number = null;

  movimientoFilter: MovimientoArticuloDTO[] = [];
  movimientosPrevios: StockArticulo[] = [];
  stockArticuloPorAjuste: StockArticulo[] = [];

  articulosStockMovimiento: any[] = [];
  articulosStockMovimientoFilter: any[] = [];
  nombreRepe: boolean;
  ajusteForm: FormGroup;
  errorInForm = false;
  submitted = false;


  constructor(
    private comprasService: PedidosService,
    private articuloService: ArticulosService,
    private proveedorService: ProveedoresService,
    private movimientosService: MovimientosService,
    private route: Router,
    private active: ActivatedRoute,
    private ajusteService: AjustesService,
    private formBuilder: FormBuilder,
    public matDialog: MatDialog,
  ) {
  }

  // tslint:disable-next-line: typedef
  async ngOnInit() {
    if (this.route.url === '/abm-compras/agregar-ajuste') {
      console.warn('AGREGAR AJUSTE');
      this.ajusteForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        fecha: ['', Validators.required],
        descripcion: ['', null],
        proveedorId: ['', Validators.required],
      });
    } else {
      console.warn('CONSULTA DE AJUSTE');

      const idAjuste = Number(this.active.snapshot.paramMap.get('id'));
      await this.ajusteService.listarAjusteId(idAjuste)
        .toPromise()
        .then((data) => (this.ajuste = data.data));

      this.proveedorID = this.ajuste.proveedorId;

      this.ajusteForm = this.formBuilder.group({
        id: [this.ajuste.id, null],
        nombre: [{value: this.ajuste.nombre, disabled: this.consultar}, Validators.required],
        fecha: [{value: this.ajuste.fecha, disabled: this.consultar}, Validators.required],
        descripcion: [{value: this.ajuste.descripcion, disabled: this.consultar}, null],
        proveedorId: [{value: this.ajuste.proveedorId, disabled: this.consultar}, Validators.required],
      });
    }

    this.ajusteService.listarAjusteTodos().subscribe(resp =>
      this.ajustes = resp.data);

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


  // tslint:disable-next-line: typedef
  onSubmit() {
    this.submitted = true;
    this.errorInForm = this.submitted && this.ajusteForm.invalid;

    if (this.errorInForm || this.nombreRepe) {
      this.ajusteForm.controls.nombre.markAsTouched();
      this.ajusteForm.controls.fecha.markAsTouched();
      this.ajusteForm.controls.descripcion.markAsTouched();
      this.ajusteForm.controls.proveedor.markAsTouched();
    } else {
      console.log('CARGA DE MOVIMIENTOS');
      this.makeDTO();
    }

  }

  // tslint:disable-next-line:typedef
  makeDTO() {
    this.ajuste = new Ajuste();

    this.ajuste.nombre = (this.ajusteForm.controls.nombre.value).trim();
    this.ajuste.fecha = (this.ajusteForm.controls.fecha.value).trim();
    this.ajuste.descripcion = (this.ajusteForm.controls.descripcion.value).trim();
    this.ajuste.proveedorId = this.ajusteForm.controls.proveedorId.value;

    this.ajusteService.guardarAjuste(this.ajuste).then((data) => {
      console.log(data);

      this.ajuste = data.data;

      this.articulosStockMovimientoFilter.forEach((artStockMov, index) => {
        if (artStockMov.movimiento.movimiento !== null) {
          this.movimientoArticuloDTO.id = null;
          this.movimientoArticuloDTO.fecha = this.ajuste.fecha;
          this.movimientoArticuloDTO.articuloId = artStockMov.articulo.id;
          this.movimientoArticuloDTO.movimiento = artStockMov.movimiento.movimiento;
          this.movimientoArticuloDTO.ajusteId = this.ajuste.id;

          this.movimientosService.guardarMovimientoAjuste(this.movimientoArticuloDTO)
            .subscribe((resp) => {
            });
        }
      });
    });
    this.showModal();

  }

  // tslint:disable-next-line:typedef
  showModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '280px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: 'Se guardo un nuevo ajuste',
      title: 'Carga de Ajuste',
      status: 'alert'
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      window.history.back();
    });
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
      const data = await this.movimientosService
        .getMovimientosPreviosAjustes(this.ajuste.id)
        .toPromise();
      console.log('getMovimientosPrevios');
      const keys = Object.keys(data.data);
      const value = Object.values(data.data);
      const movimientosPrev = [];
      value.forEach((v, index) => {
        const stock = new StockArticulo(Number(keys[index]), Number(v));
        movimientosPrev.push(stock);
      });
      this.movimientosPrevios = movimientosPrev;
      console.log(movimientosPrev);
      // tslint:disable-next-line:variable-name
      this.articulos.forEach((a, index_1) => {
        this.stockArticulo.push(data.data.id);
      });
      this.movimientosPrevios.forEach((mov) => this.stockArticulo.push(mov.stock)
      );
    } else {
      // tslint:disable-next-line: variable-name
      const data_1 = await this.movimientosService
        .listarStockArticuloAjuste()
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

  // tslint:disable-next-line:typedef
  guardarCarga() {
    console.log('ENTRE');
  }

  // tslint:disable-next-line: typedef
  volverAtras() {
    window.history.back();
  }

  // tslint:disable-next-line: typedef
  async listarFiltro() {
    this.articulosStockMovimientoFilter = [];
    if (this.proveedorID === null) {
      this.articulosStockMovimientoFilter = this.articulosStockMovimiento;
    } else {
      await this.articulosStockMovimiento.forEach((artStockMov) => {
        artStockMov.articulo.proveedorId.id === this.proveedorID
          // tslint:disable-next-line:no-unused-expression
          ? this.articulosStockMovimientoFilter.push(artStockMov) : false;
      });
    }
  }

  // tslint:disable-next-line: typedef
  async actualizarStockFiltro(articulosFilter: Articulo[]) {
    this.stockArticulo = [];
    const data = await this.movimientosService
      .listarStockArticuloAjuste()
      .toPromise();
    articulosFilter.forEach((a, index) => {
      this.stockArticulo.push(data.data[a.id]);
    });
  }

  // tslint:disable-next-line: typedef
  async getStock() {
    if (this.consultar) {
      const data = await this.movimientosService
        .getMovimientosStockAjuste(this.ajuste.id)
        .toPromise();
      const keys = Object.keys(data.data);
      const value = Object.values(data.data);
      keys.forEach((k, index) => this.stockArticuloPorAjuste.push(
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

  // tslint:disable-next-line:typedef
  validarNombre({target}) {
    const {value: nombre} = target;
    const finded = this.ajustes.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());
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
