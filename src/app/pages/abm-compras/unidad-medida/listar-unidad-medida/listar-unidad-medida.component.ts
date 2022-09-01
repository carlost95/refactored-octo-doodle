import {Component, OnInit, ViewChild} from '@angular/core';
import {UnidadMedidaService} from '@service/unidad-medida.service';
import {MatDialog} from '@angular/material/dialog';
import {AgregarUnidadMedidaComponent} from '../agregar-unidad-medida/agregar-unidad-medida.component';
import {ConfirmModalComponent} from '@shared/confirm-modal/confirm-modal.component';
import {TokenService} from '@service/token.service';
import {SnackConfirmComponent} from '@shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UnidadMedidaRest} from '../../../../models/unidad-medida-rest';
import {BuscadorService} from '../../../../shared/helpers/buscador.service';
import {TipoModal} from '../../../../shared/models/tipo-modal.enum';
import {TituloUnidadMedida} from '../models/titulo-unidad-medida.enum';

@Component({
  selector: 'app-listar-unidad-medida',
  templateUrl: './listar-unidad-medida.component.html',
  styleUrls: ['./listar-unidad-medida.component.css']
})
export class ListarUnidadMedidaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<UnidadMedidaRest>;
  displayedColumns: string[] = ['nombre', 'abreviatura', 'habilitado', 'acciones'];

  unidadesDeMedida: UnidadMedidaRest[];
  unidadMedida: UnidadMedidaRest;
  mostrarHabilitacion: boolean;
  roles: string[];

  constructor(
    private readonly unidadMedidaService: UnidadMedidaService,
    private readonly buscadorService: BuscadorService,
    public matDialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion = this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_ADMIN_BANCO');
    this.unidadMedidaService.obtenerUnidadesMedida().subscribe(unidadesDeMedida => {
      this.unidadesDeMedida = unidadesDeMedida;
      this.establecerDatasource(unidadesDeMedida);
    });
  }

  establecerDatasource(unidadesDeMedida: UnidadMedidaRest[]): void {
    this.dataSource = new MatTableDataSource(unidadesDeMedida);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  nuevo(): void {
    const data = {
      titulo: TituloUnidadMedida.creacion,
      tipo: TipoModal.creacion
    };
    this.abrirModalUnidadMedida(data);
  }

  consultar(unidadDeMedida: UnidadMedidaRest): void {
    const data = {
      titulo: TituloUnidadMedida.consulta,
      tipo: TipoModal.consulta,
      unidadDeMedida
    };
    this.abrirModalUnidadMedida(data);
  }

  editar(unidadDeMedida: UnidadMedidaRest): void {
    const data = {
      titulo: TituloUnidadMedida.actualizacion,
      tipo: TipoModal.actualizacion,
      unidadDeMedida
    };
    this.abrirModalUnidadMedida(data);
  }

  abrirModalUnidadMedida(data: any): void {
    const dialog = this.matDialog.open(AgregarUnidadMedidaComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '20rem',
      panelClass: 'no-padding',
      data,
    });

    dialog.afterClosed().subscribe((result) => {
      this.unidadMedidaService.obtenerUnidadesMedida().subscribe(unidadesDeMedida => {
        this.unidadesDeMedida = unidadesDeMedida;
        this.establecerDatasource(unidadesDeMedida);
      });
      if (result) {
        this.openSnackBar(result);
      }
    });
  }

  abrirModalHabilitacion(unidadMedida: UnidadMedidaRest): void {
    const dialog = this.matDialog.open(ConfirmModalComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '20rem',
      data: {
        message: '¿Desea cambiar estado?',
        title: 'Cambio estado',
        state: unidadMedida.habilitado,
      }
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.state) {
        // tslint:disable-next-line:no-shadowed-variable
        this.unidadMedidaService
          .cambiarEstado(unidadMedida.idUnidadMedida)
          .subscribe(() => {
            this.unidadMedidaService.obtenerUnidadesMedida().subscribe(unidadesDeMedida => {
              this.unidadesDeMedida = unidadesDeMedida;
              this.establecerDatasource(unidadesDeMedida);
            });
          });
      } else {
        this.unidadMedidaService.obtenerUnidadesMedida().subscribe(unidadesDeMedida => {
          this.unidadesDeMedida = unidadesDeMedida;
          this.establecerDatasource(unidadesDeMedida);
        });
      }
    });  }

  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }

  filtrarUnidadesDeMedida(value: string): void {
    const TERMINO = 'nombre';
    const unidadesDeMedida = this.buscadorService.buscarTermino(this.unidadesDeMedida, TERMINO, value);
    this.establecerDatasource(unidadesDeMedida);
  }
}
