import {Router} from '@angular/router';
import {PedidosService} from '@service/pedidos.service';
import {Articulo} from '@models/Articulo';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ExcelExportService} from '@service/excel-export.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AgregarArticuloComponent} from '../agregar-articulo/agregar-articulo.component';
import {ArticulosService} from '@service/articulos.service';
import {MatPaginator} from '@angular/material/paginator';
import {ConfirmModalComponent} from '@shared/confirm-modal/confirm-modal.component';
import {TokenService} from '@service/token.service';
import {SnackConfirmComponent} from '@shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ArticuloRest} from '../../../../models/articulo-rest';
import {TipoModal} from '../../../../shared/models/tipo-modal.enum';
import {TituloArticulo} from '../models/titulo-departamento.enum';

@Component({
  selector: 'app-listar-articulos',
  templateUrl: './listar-articulos.component.html',
  styleUrls: ['./listar-articulos.component.css'],
})


export class ListarArticulosComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<ArticuloRest>;
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'precio',
    'costo',
    'unidadMedida',
    'rubro',
    'habilitado',
    'acciones',
  ];
  articulos: ArticuloRest[];
  articulo: ArticuloRest;
  mostrarHabilitacion: boolean;
  roles: string[];

  constructor(
    private readonly articuloService: ArticulosService,
    public matDialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion =
      this.roles.includes('ROLE_ADMIN') ||
      this.roles.includes('ROLE_GERENTE');
    this.articuloService.obtenerArticulos().subscribe(articulos => {
      this.articulos = articulos;
      this.establecerDatasource(articulos);
    });

  }

  establecerDatasource(articulos: ArticuloRest[]): void {
    this.dataSource = new MatTableDataSource(articulos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  nuevo(): void {
    const data = {
      titulo: TituloArticulo.creacion,
      tipo: TipoModal.creacion
    };
    this.abrirModalArticulo(data);
  }

  consultar(articulo: ArticuloRest): void {
    const data = {
      titulo: TituloArticulo.consulta,
      tipo: TipoModal.consulta,
      articulo
    };
    this.abrirModalArticulo(data);
  }

  editar(articulo: ArticuloRest): void {
    const data = {
      titulo: TituloArticulo.actualizacion,
      tipo: TipoModal.actualizacion,
      articulo
    };
    this.abrirModalArticulo(data);
  }

  abrirModalArticulo(data: any): void {
    const dialogConfig = this.matDialog.open(AgregarArticuloComponent, {
      disableClose: true,
      id: 'modal-component',
      panelClass: 'no-padding',
      data,
    });
    dialogConfig.afterClosed().subscribe((result) => {
      this.articuloService.obtenerArticulos().subscribe(articulos => {
        this.articulos = articulos;
        this.establecerDatasource(articulos);
      });
      if (result) {
        this.openSnackBar(result);
      }
    });
  }

  showModal(articulo: Articulo): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: articulo.habilitacion
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      // if (result.state) {
      //   // tslint:disable-next-line:no-shadowed-variable
      //   this.articuloService.cambiarHabilitacion(articulo.id).subscribe(result => {
      //     this.getData();
      //   });
      // } else {
      //   this.getData();
      // }
    });
  }

  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }

  filtrar($event: string) {
  }
}


