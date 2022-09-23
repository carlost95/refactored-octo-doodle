import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ProveedoresService} from '@service/proveedores.service';
import {Proveedor} from '@models/Proveedor';
import {ArticulosService} from '@service/articulos.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ArticuloStock} from '@models/articulo-rest';
import {Pedido} from '@models/pedido';
import {BuscadorService} from '@shared/helpers/buscador.service';
import {PedidosService} from '@service/pedidos.service';
import {SearchComponent} from '@shared/template/search/search.component';
import {Router} from "@angular/router";
import {SnackConfirmComponent} from "@shared/snack-confirm/snack-confirm.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-agregar-pedido',
  templateUrl: './agregar-pedido.component.html',
  styleUrls: ['./agregar-pedido.component.css'],
  encapsulation : ViewEncapsulation.None,
})
export class AgregarPedidoComponent implements OnInit {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly proveedorService: ProveedoresService,
    private readonly articuloService: ArticulosService,
    private readonly buscadorService: BuscadorService,
    private readonly pedidoService: PedidosService,
    private readonly snackbar: MatSnackBar,
    private readonly router: Router,
  ){}
  private submitted = false;
  @ViewChild(SearchComponent) searcher: SearchComponent;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<ArticuloStock> = new MatTableDataSource<ArticuloStock>();
  proveedores: Proveedor[] = [];
  pedidoForm: FormGroup;
  displayedColumns = ['nombre', 'codigoArt', 'stockActual', 'cantidad', 'stockFinal' ];
  articuloMessage = 'No se selecciono un proveedor';
  articulos: ArticuloStock[] = [];
  termino = '';


  ngOnInit(): void {
    this.proveedorService
      .getEnabledSupplier()
      .subscribe(proveedores => this.proveedores = proveedores);
    this.inicializarPedidoFormDatos();
  }

  inicializarPedidoFormDatos(): void {
    this.pedidoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', null],
      proveedorId: ['', Validators.required]
    });
  }

  establecerDataSource(articulos: ArticuloStock[]): void {
    this.dataSource = new MatTableDataSource<ArticuloStock>(articulos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (articulos.length === 0 ){
      this.articuloMessage = 'No se encontraron productos para el proveedor';
    }
  }

  proveedorChange(proveedorId: number): void {
    this.articuloService
      .obtenerArticuloPorProveedor(proveedorId)
      .subscribe(articulos => {
        this.articulos = articulos;
        this.establecerDataSource(articulos);
      });
  }

  guardar(): void {

    if (this.pedidoForm.invalid){
      this.pedidoForm.controls.nombre.markAsTouched();
      this.pedidoForm.controls.fecha.markAsTouched();
      this.pedidoForm.controls.proveedorId.markAsTouched();
      return;
    }

    const pedido: Pedido = this.pedidoForm.getRawValue();
    const articulos = this.dataSource.data.filter(articulo => articulo.cantidad !== 0);

    pedido.articulos = articulos;

    this.pedidoService.guardar(pedido).subscribe( result => {
      this.router.navigate(['/compras/listar-pedido']);
      this.openSnackBar('Se guardo pedido exitosamente');
    });
  }


  actualizarCantidad(event: Event, id: number): void {
    const target = event.target as HTMLInputElement ;
    const cantidad = Number(target?.value);
    const articulos = this.articulos;
    const articulosUpdated = articulos.map(articulo => {
      if (articulo.id === id){
        return {
          ...articulo,
          cantidad,
          stockFinal: articulo.stockActual + cantidad
        };
      }
      return articulo;
    });
    this.articulos = articulosUpdated;
    this.establecerDataSource(articulosUpdated);
    this.searcher.reset();
  }

  filtrarTermino(value: string): void {
    const TERMINO = 'nombre';
    const articulos = this.buscadorService.buscarTermino(
      this.articulos,
      TERMINO,
      value
    );
    this.establecerDataSource(articulos);
  }

  openSnackBar(msg: string): void {
    this.snackbar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
}

