import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticulosService } from '../../../../service/articulos.service';
import { BuscadorService } from '../../../../shared/helpers/buscador.service';
import { VentasService } from '../../../../service/ventas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  validateClient = true;
  filteredClient: Observable<Cliente[]>;
  filterEmpresa: Observable<Empresa[]>;
  filteredArticulo: Observable<ArticuloVenta[]>;
  valueInput: string = null;

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
    private readonly router: Router,
    private readonly buscadorService: BuscadorService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }


  ngOnInit(): void {

    this.articuloService.obtenerArticulosVenta().subscribe(articulos => {
      this.articulos = articulos
    });
    this.clienteService.getAllEnabledClient().subscribe(client => {
      this.clientes = client;
    });
    this.empresaService.getEnabledEmpresas()
      .subscribe(empresas =>
        this.empresas = empresas, error => this.empresas = []);

    const id = this.activatedRoute.snapshot.paramMap.get('idVenta');
    if (id) {
      this.CONSULTA = true;
      this.loading = true;
      this.establecerventasFormConDatos(id);
      return;
    }

    this.establecerventasFormSinDatos();
  }
  establecerventasFormConDatos(id: string): void {

  }
  establecerventasFormSinDatos(): void {

    this.ventaForm = this.formBuilder.group({
      idVenta: ['', Validators.required],
      idEmpresa: ['', Validators.required],
      idCliente: ['', Validators.required],
      idDireccion: [null, Validators.required],
      nroVenta: ['', Validators.required],
      fecha: ['', Validators.required],
      iva: ['', Validators.required],
      descuento: ['', Validators.required],
      total: ['', Validators.required],
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

  // TODO: FUNCION QUE NO LANZA ERROR PERO FALLA --> VERIFICAR EL FORM.array
  cargarArticulo(event: any): void {
    this.filteredArticulo = of(event.target.value).pipe(
      debounceTime(250),
      startWith(''),
      map(value => this._filterArticle(value.toString()))
    )
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
    this.cliente = event.option.value;
    this.direccionesService
      .getAllEnabledDirectionByIdClient(this.cliente.idCliente)
      .subscribe(direcciones => this.direcciones = direcciones, error => this.direcciones = []);
    this.validateClient = false;
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
    if (event.keyCode == 13) {
      const target = event.target as HTMLInputElement;
      const cantidad = Number(target?.value);
      for (const article of this.articulosSave) {
        if (article.idArticulo === id) {
          article.cantidad = cantidad;
          article.subTotal = cantidad * article.precio;
        }
      }
      this.establecerDataSource(this.articulosSave);
    }
  }
  removeArticle(id: number): void {
    this.articulosSave = this.articulosSave.filter(articulo => articulo.idArticulo !== id);
    this.establecerDataSource(this.articulosSave);
  }
  getTotalCost() {
    return this.articulosSave.map(article => article.subTotal).reduce((acc, value) => acc + value, 0);
  }
  openSnackBar(msg: string): void {
    this.snackbar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
  guardar() {
    console.log('guardar');
  }
  cancelar() {
    this.router.navigate(['/ventas/listar-venta']);
  }
}