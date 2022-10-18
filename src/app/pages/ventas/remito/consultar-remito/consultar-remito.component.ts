import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchComponent } from '../../../../shared/template/search/search.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArticuloRemito } from '../../../../models/articulo-rest';
import { Empresa } from '../../../../models/Empresa';
import { Cliente } from '../../../../models/Cliente';
import { Direccion } from '../../../../models/Direccion';
import { RemitoService } from '../../../../service/remito.service';
import { map } from 'rxjs/operators';
import { SnackConfirmComponent } from '../../../../shared/snack-confirm/snack-confirm.component';
import { RemitoConsult } from '../../../../models/Remito';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListarRemitosComponent } from '../listar-remitos/listar-remitos.component';
import { duration } from 'moment';


@Component({
  selector: 'app-consultar-remito',
  templateUrl: './consultar-remito.component.html',
  styleUrls: ['./consultar-remito.component.scss']
})
export class ConsultarRemitoComponent implements OnInit {

  loading = false;
  @ViewChild(SearchComponent) searcher: SearchComponent;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<ArticuloRemito> = new MatTableDataSource<ArticuloRemito>();
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  remitoForm: FormGroup;
  articulos: ArticuloRemito[] = [];
  empresas: Empresa[] = [];
  clientes: Cliente[] = [];
  direcciones: Direccion[] = [];
  cliente: Cliente = new Cliente();
  empresa: Empresa = new Empresa();
  articulo: ArticuloRemito = new ArticuloRemito();
  CONSULTA = false;
  ENTREGADO = false;
  validateRemito = false;
  validateClient = false;
  errorInForm: any;
  titulo = '';
  remitoToSave: RemitoConsult;


  displayedColumns = ['codigo', 'nombre', 'cantidad'];
  articuloMensaje = 'No se cargo ningun articulo a la venta';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly remitoService: RemitoService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly snackbar: MatSnackBar,
  ) {
  }


  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('idRemito');
    const ruta = this.activatedRoute.snapshot.url[0].path;
    if (ruta === 'consultar-remito') {
      this.titulo = 'Consulta de remito';
      this.CONSULTA = true;
      this.loading = true;
      this.establecerventasFormConDatos(id);
    }
    else {
      this.titulo = 'Cambio de estado';
      this.CONSULTA = true;
      this.ENTREGADO = true;
      this.loading = true;
      this.establecerventasFormConDatos(id);
    }
  }
  establecerventasFormConDatos(id): void {
    this.remitoService
      .getRemitoById(id)
      .pipe(
        map(remito => {
          this.remitoForm = this.formBuilder.group({
            idRemito: [remito.idRemito, Validators.required],
            empresa: [{ value: remito.empresa, disabled: true }, Validators.required],
            cliente: [{ value: remito.cliente, disabled: true }, Validators.required],
            direccion: [{ value: remito.direccion, disabled: true }, Validators.required],
            nroRemito: [{ value: remito.nroRemito, disabled: true }, Validators.required],
            fecha: [{ value: new Date(remito.fechaRemito), disabled: true }, Validators.required],
          });
          this.cliente = remito.cliente;
          this.empresa = remito.empresa;
          this.direcciones = [remito.direccion];
          this.validateRemito = true;
          if (remito.articulos.length > 0) {
            this.establecerDataSource(remito.articulos);
          }
        }),
      )
      .subscribe((arts) => {
        this.loading = false;
      },
        ({ error }) => {
          this.openSnackBar(error);
          this.router.navigate(['ventas/listar-remitos']);
        });

  }
  establecerDataSource(articulos: ArticuloRemito[]): void {
    this.dataSource = new MatTableDataSource<ArticuloRemito>(articulos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if (articulos.length === 0) {
      this.articuloMensaje = 'No se cargo ningun articulo a la venta';
    }
  }

  volver(): void {
    this.router.navigate(['ventas/listar-remitos']);
  }
  confirmarCambioEstado() {
    const remito = this.remitoForm.getRawValue();
    const articulos = this.dataSource.data;
    this.remitoToSave = remito;
    this.remitoToSave.articulos = articulos;
    console.log(this.remitoToSave);



    this.remitoService.changeStatusRemito(this.remitoToSave)
      .subscribe(
        (data) => {
          this.msgSnack('Remito nro: ' + data.nroRemito + ' actualiazo con Exito');
        },
        ({ error }) => {
          this.openSnackBar(error);
        }
      );
  }
  msgSnack(data: string): void {
    this.openSnackBar(data);
    this.router.navigate(['ventas/listar-remitos']);
  }
  openSnackBar(msg: string): void {
    this.snackbar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
}
