/* tslint:disable:align */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticulosService } from '../../../../service/articulos.service';
import { BuscadorService } from '../../../../shared/helpers/buscador.service';
import { VentasService } from '../../../../service/ventas.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../../../../shared/template/search/search.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArticuloVenta } from '../../../../models/articulo-rest';
import { EmpresaService } from '../../../../service/empresa.service';
import { Empresa } from '../../../../models/Empresa';
import { map, startWith, debounceTime, filter } from 'rxjs/operators';
import { ClienteService } from '../../../../service/cliente.service';
import { Cliente } from '@models/Cliente';
import { Observable, of } from 'rxjs';
import { DireccionesService } from '../../../../service/direcciones.service';
import { Direccion } from '../../../../models/Direccion';
import { SnackConfirmComponent } from '../../../../shared/snack-confirm/snack-confirm.component';
import * as moment from 'moment';
import { Venta } from '../../../../models/Venta';
import { cliente } from '../../../../../environments/global-route';


@Component({
  selector: 'app-agregar-venta',
  templateUrl: './agregar-venta.component.html',
  styleUrls: ['./agregar-venta.component.scss']
})
export class AgregarVentaComponent implements OnInit {
  loading = false;
  @ViewChild(SearchComponent) searcher: SearchComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<ArticuloVenta> = new MatTableDataSource<ArticuloVenta>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  ventaForm: FormGroup;
  articulos: ArticuloVenta[] = [];
  articulosSave: ArticuloVenta[] = [];
  empresas: Empresa[] = [];
  clientes: Cliente[] = [];
  direcciones: Direccion[] = [];
  cliente: Cliente = new Cliente();
  empresa: Empresa = new Empresa();
  articulo: ArticuloVenta = new ArticuloVenta();
  termino = '';
  CONSULTA = false;
  validateVenta = false;
  validateClient = false;
  filteredClient: Observable<Cliente[]>;
  filterEmpresa: Observable<Empresa[]>;
  filteredArticulo: Observable<ArticuloVenta[]>;
  submitted: boolean;
  errorInForm: any;
  descuento = 0;
  total = 0;
  nroVenta: number = 0;
  articulosVenta: ArticuloVenta[]; //

  displayedColumns = ['codigo', 'nombre', 'cantidad', 'precioUnitario', 'total', 'accion'];
  articuloMensaje = 'No se cargo ningun articulo a la venta';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly articuloService: ArticulosService,
    private readonly ventaService: VentasService,
    private readonly empresaService: EmpresaService,
    private readonly clienteService: ClienteService,
    private readonly direccionesService: DireccionesService,
    private readonly snackbar: MatSnackBar,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
  }


  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('idVenta');

    this.articuloService.obtenerArticulosVenta().subscribe(articulos => {
      this.articulos = articulos;
    });
    this.clienteService.getAllEnabledClient().subscribe(client => {
      this.clientes = client;
    });
    this.empresaService.getEnabledEmpresas()
      .subscribe(empresas =>
        this.empresas = empresas, error => this.empresas = []);
    if (id) {
      this.CONSULTA = true;
      this.loading = true;
      this.establecerventasFormConDatos(id);
      return;
    }

    this.establecerventasFormSinDatos();
  }

  establecerventasFormConDatos(id): void {
    this.ventaService
      .getSaleById(id)
      .pipe(
        map(venta => {
          this.ventaForm = this.formBuilder.group({
            idEmpresa: [{ value: venta.empresa.idEmpresa, disabled: true }, Validators.required],
            idCliente: [{ value: venta.cliente.idCliente, disabled: true }, Validators.required],
            idDireccion: [{ value: venta.direccion.idDireccion, disabled: true }, Validators.required],
            nroVenta: [{ value: venta.nroVenta, disabled: true }, Validators.required],
            fecha: [{ value: new Date(venta.fechaVenta), disabled: true }, Validators.required],
            total: [{ value: venta.total, disabled: true }, Validators.required],
            descuento: [{ value: venta.descuento, disabled: true }, Validators.required],
          });
          this.cliente = venta.cliente;
          this.empresa = venta.empresa;
          this.direcciones = [venta.direccion];
          this.validateVenta = true;
          this.establecerDataSource(venta.articulos);



          this.total = this.ventaForm.controls.total.value;
          this.descuento = this.ventaForm.controls.descuento.value;

        }),
      )
      .subscribe(arts => {
        this.loading = false;
      });
  }

  establecerventasFormSinDatos(): void {
    this.ventaForm = this.formBuilder.group({
      idEmpresa: ['', Validators.required],
      idCliente: ['', Validators.required],
      idDireccion: ['', Validators.required],
      nroVenta: [0, null],
      fecha: ['', null],
      descuento: [0, null],
      total: ['', null],

    }),
      this.cliente = new Cliente();
    this.filteredClient = this.ventaForm.controls.idCliente.valueChanges.pipe(
      debounceTime(250),
      startWith(''),
      map(value => this._filterClient(value))
    );
    this.empresa = new Empresa();
    this.filterEmpresa = this.ventaForm.controls.idEmpresa.valueChanges.pipe(
      debounceTime(250),
      startWith(''),
      map(value => this._filterEnterpise(value))
    );
  }

  establecerDataSource(articulos: ArticuloVenta[]): void {
    this.dataSource = new MatTableDataSource<ArticuloVenta>(articulos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (articulos.length === 0) {
      this.articuloMensaje = 'No se cargo ningun articulo a la venta';
    }
  }


  private _filterClient(value: string): Cliente[] {
    const filterValue = value.toString().toLowerCase().trim();
    return this.clientes.filter(cliente => cliente.dni.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterEnterpise(value: string): Empresa[] {
    const filterValue = value.toString().toLowerCase().trim();
    return this.empresas.filter(empresa => empresa.cuit.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterArticle(value: string): ArticuloVenta[] {
    const filterValue = value.toLowerCase().trim();
    return this.articulos.filter(
      articulo => (articulo.nombre.toLowerCase() || articulo.codigoArticulo.toLowerCase()).indexOf(filterValue) === 0);
  }

  cargarArticulo(event: any): void {
    this.filteredArticulo = of(event.target.value).pipe(
      debounceTime(250),
      startWith(''),
      map(value => this._filterArticle(value.toString()))
    );
  }


  displayCliente(cliente: Cliente): string {
    return cliente.dni || '';
  }

  displayEmpresa(empresa: Empresa): string {
    return empresa.cuit || '';
  }

  displayArticulo(): string {
    return '';
  }


  setCliente(event: any): void {
    this.cliente = event?.option?.value;
    this.direccionesService
      .getAllEnabledDirectionByIdClient(this.cliente.idCliente)
      .subscribe(direcciones => this.direcciones = direcciones, error => this.direcciones = []);
    this.validateClient = true;
  }

  setEmpresa(event: any): void {
    this.empresa = event.option.value;
  }

  setArticulo(event: any): void {
    this.articulo = event.option.value;
    for (const article of this.articulosSave) {
      if (this.articulo.idArticulo === article.idArticulo) {
        this.openSnackBar('El articulo ' + this.articulo.nombre + ' ya se encuentra registrado para esta venta');
        return;
      }
    }
    this.articulosSave.push(this.articulo);
    this.establecerDataSource(this.articulosSave);
  }

  actualizarCantidad(event: any, id: number): void {
    if (event.keyCode === 13) {
      const target = event.target as HTMLInputElement;
      const cantidad = Number(target?.value);
      for (const article of this.articulosSave) {
        if (article.idArticulo === id) {
          article.cantidad = cantidad;
          article.subTotal = cantidad * article.precio;
        }
      }
      this.establecerDataSource(this.articulosSave);
      this.validateVenta = true;
    }
  }

  removeArticle(id: number): void {
    this.articulosSave = this.articulosSave.filter(articulo => articulo.idArticulo !== id);
    this.establecerDataSource(this.articulosSave);
  }

  getTotalCost = () => {
    this.total = this.articulosSave.map(article => article.subTotal).reduce((acc, value) => acc + value, 0);
    return this.total;
  }

  aplicarDescuento(event: any): void {
    if (event.keyCode === 13) {
      // tslint:disable-next-line:one-variable-per-declaration
      const target = event.target as HTMLInputElement, descuento = Number(target?.value);
      this.ventaForm.controls.descuento.setValue(descuento);
      this.descuento = this.total - (this.getTotalCost() - descuento * this.getTotalCost() / 100);
    }
  }
  cargarTotal(): number {
    return this.ventaForm.controls.total.value;
  }
  cargarTotalCost(): number {
    return this.cargarTotal() - this.cargarDescuento();
  }
  cargarDescuento() {
    let totalSinDescuento = (this.total - (this.ventaForm.controls.descuento.value * this.total) / 100)
    console.log('descuento' + totalSinDescuento);

    return this.total - totalSinDescuento;
  }

  getTotal(): number {
    return (this.total - this.descuento);
  }
  getDescuento(): number {
    return this.descuento;
  }

  openSnackBar(msg: string): void {
    this.snackbar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 6 * 1000,
      data: msg,
    });
  }

  guardar(): void {
    this.submitted = true;
    this.errorInForm = this.submitted && this.ventaForm.invalid;
    if (this.errorInForm) {
      this.ventaForm.controls.idEmpresa.markAsTouched();
      this.ventaForm.controls.idCliente.markAsTouched();
      this.ventaForm.controls.idDireccion.markAsTouched();
      return;
    } else {
      this.makeDTO();
    }
  }

  makeDTO(): void {
    if (this.articulosSave.length <= 0) {
      this.openSnackBar('No se puede generar una venta sin cargar articulos');
      return;
    }
    for (const iterator of this.articulosSave) {
      if (iterator.cantidad <= 0) {
        this.openSnackBar('La cantidad o subtotal  del articulo"' + iterator.nombre.toUpperCase() + '" debe ser mayor a 0');
        return;
      }
    }
    const venta = this.ventaForm.getRawValue();
    const articulos = this.dataSource.data;
    venta.idCliente = venta.idCliente.idCliente;
    venta.nombreCliente = (this.cliente.apellido + ', ' + this.cliente.nombre);
    venta.idEmpresa = venta.idEmpresa.idEmpresa;
    venta.fecha = this.addTimeToDate(Date.now());
    venta.total = this.getTotal();
    venta.articulos = articulos;

    this.ventaService.saveSale(venta).subscribe(data => {
      this.openSnackBar('Venta registrada con exito');
      this.router.navigate(['/ventas/listar-venta']);
    });
  }

  addTimeToDate(newdate): Date {
    const _ = moment();
    const date = moment(newdate).add({ hours: _.hour(), minutes: _.minute(), seconds: _.second() });
    return date.toDate();
  }
}
