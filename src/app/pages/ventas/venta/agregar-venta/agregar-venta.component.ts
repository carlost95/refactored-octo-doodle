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
import { map, startWith, debounceTime } from 'rxjs/operators';
import { ClienteService } from '../../../../service/cliente.service';
import { Cliente } from '@models/Cliente';
import { Observable } from 'rxjs';
import {DireccionesService} from '../../../../service/direcciones.service';
import {Direccion} from '../../../../models/Direccion';



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
  empresa: Empresa;
  clientes: Cliente[] = [];
  direcciones: Direccion[] = [];
  cliente: Cliente = new Cliente();
  termino = '';
  CONSULTA = false;
  filteredClient: Observable<Cliente[]>;

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
  ) {}


  ngOnInit(): void {

    this.articuloService.obtenerArticulosVenta().subscribe(articulos => {
      this.articulos = articulos
      console.log(articulos)
    });
    this.clienteService.getAllEnabledClient().subscribe(client => {
      this.clientes = client;
    });
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
    // this.ventaForm = this.formBuilder.group({
    // });
  }
  establecerventasFormSinDatos(): void {
    this.empresaService.getEnabledEmpresas().
      pipe(
        map(empresas => {
          if (empresas.length > 0) {
            this.ventaForm = this.formBuilder.group({
              idCliente: ['', Validators.required],
              idDireccion: ['', Validators.required],
              nroVenta: ['', Validators.required],
              fecha: ['', Validators.required],
              razonSocial: [{ value: empresas[0].razonSocial, disabled: true }, Validators.required],
              cuit: [{ value: empresas[0].cuit, disabled: true }, Validators.required],
              telefono: [{ value: empresas[0].telefono, disabled: true }, Validators.required],
              email: [{ value: empresas[0].email, disabled: true }, Validators.required],
              domicilio: [{ value: empresas[0].domicilio, disabled: true }, Validators.required],
            });
          }
          this.cliente = new Cliente();
          this.filteredClient = this.ventaForm.controls.idCliente.valueChanges.pipe(
            debounceTime(250),
            startWith(''),
            map(value => this._filterClient(value))
          );

        }),
      ).subscribe(data => {
        this.loading = false;
      });
  }

  private _filterClient(value: string): Cliente[] {
    const filterValue = value.toString().toLowerCase().trim();
    console.log(this.ventaForm.controls.idCliente.value);

    return this.clientes.filter(cliente => cliente.dni.toLowerCase().indexOf(filterValue) === 0);
  }
  displayCliente(cliente: Cliente): string {
    return cliente.dni || '';
  }

  setCliente(event: any): void {
    this.cliente = event.option.value;
    this.direccionesService
      .getAllEnabledDirectionByIdClient(this.cliente.idCliente)
      .subscribe(direcciones => this.direcciones = direcciones, error => this.direcciones = []);
  }
}
