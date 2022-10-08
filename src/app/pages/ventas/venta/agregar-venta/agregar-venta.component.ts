import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { Observable } from 'rxjs';
import { DireccionesService } from '../../../../service/direcciones.service';
import { Direccion } from '../../../../models/Direccion';



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
  filteredClient: Observable<Cliente[]>;
  filterEmpresa: Observable<Empresa[]>;
  filteredArticulo: Observable<ArticuloVenta[]>;

  displayedColumns = ['nombreArt', 'cantidad', 'precioUnitario', 'total'];
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
      idDireccion: ['', Validators.required],
      nroVenta: ['', Validators.required],
      fecha: ['', Validators.required],
      iva: ['', Validators.required],
      descuento: ['', Validators.required],
      total: ['', Validators.required],
      detalleVenta: this.formBuilder.array([
        this.formBuilder.control('', Validators.required),
      ])
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
    this.articulo = new ArticuloVenta();
    this.filteredArticulo = this.ventaForm.controls.detalleVenta.valueChanges.pipe(
      debounceTime(250),
      startWith(''),
      map(value => this._filterArticle(value))
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
    const filterValue = value.toString().toLowerCase().trim();
    console.log('valora  filtrar' + filterValue);

    return this.articulos.filter(
      articulo => articulo.nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  // TODO: FUNCION QUE NO LANZA ERROR PERO FALLA --> VERIFICAR EL FORM.array
  // cargarArticulo(event: any): void {
  //   this.filteredArticulo = event.target.value.pipe(
  //     debounceTime(250),
  //     startWith(''),
  //     map(value => this._filterArticle(value.toString()))
  //   )
  //   console.log(this.filteredArticulo);
  // }


  displayCliente(cliente: Cliente): string {
    return cliente.dni || '';
  }
  displayEmpresa(empresa: Empresa): string {
    return empresa.cuit || '';
  }
  displayArticulo(articulo: ArticuloVenta): string {
    return articulo.codigoArt || '';
  }


  setCliente(event: any): void {
    this.cliente = event.option.value;
    this.direccionesService
      .getAllEnabledDirectionByIdClient(this.cliente.idCliente)
      .subscribe(direcciones => this.direcciones = direcciones, error => this.direcciones = []);
  }
  setEmpresa(event: any): void {
    this.empresa = event.option.value;
  }
  setArticulo(event: any): void {
    console.log('articulo selected' + event);
    this.articulo = event.option.value;
    this.articulosSave.push(this.articulo);
    this.establecerDataSource(this.articulosSave);

  }
}