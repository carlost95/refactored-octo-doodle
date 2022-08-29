import {Component, OnInit, ViewChild} from '@angular/core';
import {DepartamentosService} from '../../../service/departamentos.service';
import {Departamento} from '../../../models/Departamento';
import {MatDialog} from '@angular/material/dialog';
import {AgregarDepartamentoComponent} from './agregar-departamento/agregar-departamento.component';
import {SnackConfirmComponent} from '../../../shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ConfirmModalComponent} from '../../../shared/confirm-modal/confirm-modal.component';
import {TokenService} from '../../../service/token.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DepartamentoRest} from '../../../models/departamento-rest';
import {BuscadorService} from '../../../shared/helpers/buscador.service';
import {TituloDepartamento} from './models/titulo-departamento.enum';
import {TipoModal} from '../../../shared/models/tipo-modal.enum';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss'],
})
export class DepartamentoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<DepartamentoRest>;
  displayedColumns: string[] = ['nombre', 'abreviatura', 'habilitado', 'acciones'];

  departamentos: DepartamentoRest[];
  departamento: DepartamentoRest;
  mostrarHabilitacion: boolean;
  roles: string[];

  constructor(
    private readonly departamentoService: DepartamentosService,
    private readonly buscadorService: BuscadorService,
    private readonly tokenService: TokenService,
    public matDialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion = this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_ADMIN_BANCO');
    this.departamentoService.obtenerDepartamentos().subscribe(departamentos => {
      this.departamentos = departamentos;
      this.establecerDatasource(departamentos);
    });
  }

  establecerDatasource(departamentos: DepartamentoRest[]): void {
    this.dataSource = new MatTableDataSource(departamentos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  nuevo(): void {
    const data = {
      titulo: TituloDepartamento.creacion,
      tipo: TipoModal.creacion
    };
    this.abrirModalDepartamento(data);
  }

  consultar(departamento: DepartamentoRest): void {
    const data = {
      titulo: TituloDepartamento.consulta,
      tipo: TipoModal.consulta,
      departamento
    };
    this.abrirModalDepartamento(data);
  }

  editar(departamento: DepartamentoRest): void {
    const data = {
      titulo: TituloDepartamento.actualizacion,
      tipo: TipoModal.actualizacion,
      departamento
    };
    this.abrirModalDepartamento(data);
  }

  abrirModalDepartamento(data: any): void {
    const dialogConfig = this.matDialog.open(AgregarDepartamentoComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '20rem',
      panelClass: 'no-padding',
      data,
    });
    dialogConfig.afterClosed().subscribe((result) => {
      this.departamentoService.obtenerDepartamentos().subscribe(departamentos => {
        this.departamentos = departamentos;
        this.establecerDatasource(departamentos);
      });
      if (result) {
        this.openSnackBar(result);
      }
    });
  }

  abrirModalHabilitacion(departamento: Departamento): void {
    const dialog = this.matDialog.open(ConfirmModalComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '20rem',
      data: {
        message: '¿Desea cambiar estado?',
        title: 'Cambio estado',
        state: departamento.habilitado,
      }
    });
    dialog.afterClosed().subscribe((result) => {
      if (result.state) {
        // tslint:disable-next-line:no-shadowed-variable
        this.departamentoService
          .cambiarEstado(departamento.idDepartamento)
          .subscribe(() => {
            this.departamentoService.obtenerDepartamentos().subscribe(departamentos => {
              this.departamentos = departamentos;
              this.establecerDatasource(departamentos);
            });
          });
      } else {
        this.departamentoService.obtenerDepartamentos().subscribe(departamentos => {
          this.departamentos = departamentos;
          this.establecerDatasource(departamentos);
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

  filtrarDepartamentos(value: string): void {
    const TERMINO = 'nombre';
    const bancos = this.buscadorService.buscarTermino(this.departamentos, TERMINO, value);
    this.establecerDatasource(bancos);
  }
}
