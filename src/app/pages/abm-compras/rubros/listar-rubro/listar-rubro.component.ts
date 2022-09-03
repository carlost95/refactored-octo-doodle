import {Component, OnInit, ViewChild} from '@angular/core';
import {RubrosService} from '@service/rubros.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmModalComponent} from '@shared/confirm-modal/confirm-modal.component';
import {AgregarRubroComponent} from '../agregar-rubro/agregar-rubro.component';
import {TokenService} from '@service/token.service';
import {SnackConfirmComponent} from '@shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {RubroRest} from '../../../../models/rubro-rest';
import {BuscadorService} from '../../../../shared/helpers/buscador.service';
import {TipoModal} from '../../../../shared/models/tipo-modal.enum';
import {TituloRubro} from '../models/titulo-rubro.enum';


@Component({
  selector: 'app-listar-rubro',
  templateUrl: './listar-rubro.component.html',
  styleUrls: ['./listar-rubro.component.css']
})
export class ListarRubroComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<RubroRest>;
  displayedColumns: string[] = ['nombre', 'abreviatura', 'habilitado', 'acciones'];

  rubros: RubroRest[];
  rubro: RubroRest;
  mostrarHabilitacion: boolean;
  roles: string[];

  constructor(
    private readonly rubroService: RubrosService,
    private readonly buscadorService: BuscadorService,
    public matDialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion = this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_ADMIN_BANCO');
    this.rubroService.obtenerRubros().subscribe(rubros => {
      this.rubros = rubros;
      this.establecerDatasource(rubros);
    });
  }

  establecerDatasource(rubros: RubroRest[]): void {
    this.dataSource = new MatTableDataSource(rubros);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  nuevo(): void {
    const data = {
      titulo: TituloRubro.creacion,
      tipo: TipoModal.creacion
    };
    this.abrirModalRubro(data);
  }

  consultar(rubro: RubroRest): void {
    const data = {
      titulo: TituloRubro.consulta,
      tipo: TipoModal.consulta,
      rubro
    };
    this.abrirModalRubro(data);
  }

  editar(rubro: RubroRest): void {
    const data = {
      titulo: TituloRubro.actualizacion,
      tipo: TipoModal.actualizacion,
      rubro
    };
    this.abrirModalRubro(data);
  }

  abrirModalRubro(data: any): void {
    const dialog = this.matDialog.open(AgregarRubroComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '20rem',
      panelClass: 'no-padding',
      data,
    });

    dialog.afterClosed().subscribe(result => {
      this.rubroService.obtenerRubros().subscribe(rubros => {
        this.rubros = rubros;
        this.establecerDatasource(rubros);
      });
      if (result) {
        this.openSnackBar(result);
      }
    });
  }

  abrirModalHabilitacion(rubro: RubroRest): void {
    const dialog = this.matDialog.open(ConfirmModalComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '20rem',
      data: {
        message: '¿Desea cambiar estado?',
        title: 'Cambio estado',
        state: rubro.habilitado,
      }
    });
    dialog.afterClosed().subscribe(result => {
      if (result.state) {
        // tslint:disable-next-line:no-shadowed-variable
        this.rubroService.cambiarEstado(rubro.idRubro).subscribe(result => {
          this.rubroService.obtenerRubros().subscribe(rubros => {
            this.rubros = rubros;
            this.establecerDatasource(rubros);
          });
        });
      } else {
        this.rubroService.obtenerRubros().subscribe(rubros => {
          this.rubros = rubros;
          this.establecerDatasource(rubros);
        });
      }
    });
  }

  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }

  filtrarRubros(value: string): void {
    const TERMINO = 'nombre';
    const rubros = this.buscadorService.buscarTermino(this.rubros, TERMINO, value);
    this.establecerDatasource(rubros);
  }
}
