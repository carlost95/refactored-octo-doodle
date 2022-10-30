import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProveedoresService } from '@service/proveedores.service';
import { Proveedor } from '@models/Proveedor';
import { ArticulosService } from '@service/articulos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArticuloStock } from '@models/articulo-rest';
import { Pedido } from '@models/pedido';
import { BuscadorService } from '@shared/helpers/buscador.service';
import { PedidosService } from '@service/pedidos.service';
import { SearchComponent } from '@shared/template/search/search.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackConfirmComponent } from '@shared/snack-confirm/snack-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map, switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import { AjustesService } from '../../../../service/ajustes.service';
import { AjusteDTO } from '../../../../models/Ajuste';

@Component({
  selector: 'app-agregar-ajustes',
  templateUrl: './agregar-ajustes.component.html',
  styleUrls: ['./agregar-ajustes.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AgregarAjustesComponent implements OnInit {



  loading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly proveedorService: ProveedoresService,
    private readonly articuloService: ArticulosService,
    private readonly buscadorService: BuscadorService,
    private readonly ajusteService: AjustesService,
    private readonly snackbar: MatSnackBar,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) { }
  @ViewChild(SearchComponent) searcher: SearchComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<ArticuloStock> = new MatTableDataSource<ArticuloStock>();
  proveedores: Proveedor[] = [];
  ajusteForm: FormGroup;
  displayedColumns = ['nombre', 'codigoArt', 'stockActual', 'cantidad', 'stockFinal'];
  articuloMessage = 'No se selecciono un proveedor';
  articulos: ArticuloStock[] = [];
  termino = '';
  CONSULTA = false;
  titulo = "";


  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.CONSULTA = true;
      this.loading = true;
      this.inicializarAjusteFormConDatos(id);
      return;
    }
    this.proveedorService
      .getEnabledSupplier()
      .subscribe(proveedores => this.proveedores = proveedores);
    this.inicializarAjusteFormSinDatos();
  }

  inicializarAjusteFormSinDatos(): void {
    this.titulo = "Nuevo Ajuste";
    this.ajusteForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      descripcion: ['', null],
      proveedorId: ['', Validators.required]
    });
  }

  inicializarAjusteFormConDatos(id): void {
    this.titulo = "Consulta de Ajuste";

    this.ajusteService.getAjusteById(id)
      .pipe(
        map(ajuste => {
          this.ajusteForm = this.formBuilder.group({
            nombre: [{ value: ajuste.nombre, disabled: true }, Validators.required],
            fecha: [{ value: new Date(ajuste.fecha), disabled: true }, Validators.required],
            descripcion: [{ value: ajuste.descripcion, disabled: true }, null],
            proveedorId: [{ value: ajuste.idProveedor, disabled: true }, Validators.required]
          });
          const articulos = ajuste.articulos.map(articulo => ({ ...articulo, stockFinal: articulo.stockActual + articulo.cantidad }));
          this.establecerDataSource(articulos);
          return ajuste.idProveedor;
        }),
      )
      .subscribe(arts => {
        this.loading = false;
      });
  }

  establecerDataSource(articulos: ArticuloStock[]): void {
    this.dataSource = new MatTableDataSource<ArticuloStock>(articulos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (articulos.length === 0) {
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
    if (this.ajusteForm.invalid) {
      this.ajusteForm.controls.nombre.markAsTouched();
      this.ajusteForm.controls.fecha.markAsTouched();
      this.ajusteForm.controls.proveedorId.markAsTouched();
      return;
    }

    const ajuste: AjusteDTO = this.ajusteForm.getRawValue();
    ajuste.fecha = this.addTimeToDate(ajuste.fecha);
    const articulos = this.dataSource.data.filter(articulo => articulo.cantidad !== 0);

    ajuste.articulos = articulos;

    this.ajusteService.saveAjuste(ajuste).subscribe(result => {
      this.router.navigate(['/abm-compras/listar-ajustes']);
      this.openSnackBar('Se guardo ajuste exitosamente');
    });
  }

  addTimeToDate(newdate): Date {
    const _ = moment();
    const date = moment(newdate).add({ hours: _.hour(), minutes: _.minute(), seconds: _.second() });
    return date.toDate();
  }

  actualizarCantidad(event: Event, id: number): void {
    const target = event.target as HTMLInputElement;
    const cantidad = Number(target?.value);
    const articulos = this.articulos;
    const articulosUpdated = articulos.map(articulo => {
      if (articulo.id === id) {
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

