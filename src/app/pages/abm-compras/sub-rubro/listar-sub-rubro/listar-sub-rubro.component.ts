import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarSubRubroComponent } from '../agregar-sub-rubro/agregar-sub-rubro.component';
import { SubRubroService } from '@service/sub-rubro.service';
import { ConfirmModalComponent } from '@shared/confirm-modal/confirm-modal.component';
import { TokenService } from '@service/token.service';
import { SnackConfirmComponent } from '@shared/snack-confirm/snack-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RubroRest } from '../../../../models/rubro-rest';
import { SubRubroRest } from '../../../../models/subrubro-rest';
import { BuscadorService } from '../../../../shared/helpers/buscador.service';
import { TipoModal } from '../../../../shared/models/tipo-modal.enum';
import { TituloSubRubro } from '../models/titulo-rubro.enum';

@Component({
  selector: 'app-listar-sub-rubro',
  templateUrl: './listar-sub-rubro.component.html',
  styleUrls: ['./listar-sub-rubro.component.css']
})
export class ListarSubRubroComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<SubRubroRest>;
  displayedColumns: string[] = ['nombre', 'abreviatura', 'habilitado', 'rubro', 'acciones'];

  subrubros: SubRubroRest[];
  subrubro: SubRubroRest;
  mostrarHabilitacion: boolean;
  roles: string[];


  constructor(
    private readonly subrubroService: SubRubroService,
    private readonly buscadorService: BuscadorService,
    public matDialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion = this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_ADMIN_BANCO');
    this.subrubroService.obtenerSubRubros().subscribe(subrubros => {
      this.subrubros = subrubros;
      this.establecerDatasource(subrubros);
    });
    this.subrubroService.obtenerRubros().subscribe(data => console.log(data));
  }

  establecerDatasource(subrubros: SubRubroRest[]): void {
    this.dataSource = new MatTableDataSource(subrubros);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  nuevo(): void {
    const data = {
      titulo: TituloSubRubro.creacion,
      tipo: TipoModal.creacion
    };
    this.abrirModalSubRubro(data);
  }

  consultar(subrubro: SubRubroRest): void {
    const data = {
      titulo: TituloSubRubro.consulta,
      tipo: TipoModal.consulta,
      subrubro
    };
    this.abrirModalSubRubro(data);
  }

  editar(subrubro: SubRubroRest): void {
    const data = {
      titulo: TituloSubRubro.actualizacion,
      tipo: TipoModal.actualizacion,
      subrubro
    };
    this.abrirModalSubRubro(data);
  }

  abrirModalSubRubro(data: any): void {
    const dialog = this.matDialog.open(AgregarSubRubroComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '20rem',
      panelClass: 'no-padding',
      data,
    });

    dialog.afterClosed().subscribe(result => {
      this.subrubroService.obtenerSubRubros().subscribe(subrubros => {
        this.subrubros = subrubros;
        this.establecerDatasource(subrubros);
      });
      if (result) {
        this.openSnackBar(result);
      }
    });
  }

  abrirModalHabilitacion(subrubro: SubRubroRest): void {
    const dialog = this.matDialog.open(ConfirmModalComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '20rem',
      data: {
        message: '¿Desea cambiar estado?',
        title: 'Cambio estado',
        state: subrubro.habilitado,
      }
    });
    dialog.afterClosed().subscribe(result => {
      if (result.state) {
        this.subrubroService.cambiarEstado(subrubro.idSubRubro).subscribe(result => {
          this.subrubroService.obtenerSubRubros().subscribe(subrubros => {
            this.subrubros = subrubros;
            this.establecerDatasource(subrubros);
          });
        });
        this.openSnackBar('Estado actualizado')
      } else {
        this.openSnackBar('Error al actualizar estado');
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

  filtrarSubRubros(value: string): void {
    const TERMINO = 'nombre';
    const subrubros = this.buscadorService.buscarTermino(this.subrubros, TERMINO, value);
    this.establecerDatasource(subrubros);
  }

}
