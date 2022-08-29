import {Component, OnInit, ViewChild} from '@angular/core';
import { Departamento } from '../../../models/Departamento';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { SnackConfirmComponent } from '../../../shared/snack-confirm/snack-confirm.component';
import { DistritoService } from '../../../service/distrito.service';
import { AgregarDistritoComponent } from './agregar-distrito/agregar-distrito.component';
import { TokenService } from '../../../service/token.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DistritoRest} from '../../../models/distrito-rest';
import {TipoModal} from '../../../shared/models/tipo-modal.enum';
import {TituloDistrito} from './models/titulo-distrito.enum';
import {BuscadorService} from '../../../shared/helpers/buscador.service';

@Component({
  selector: 'app-distrito',
  templateUrl: './distrito.component.html',
  styleUrls: ['./distrito.component.scss'],
})
export class DistritoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<DistritoRest>;
  displayedColumns: string[] = ['nombre', 'abreviatura', 'habilitado', 'acciones'];

  distritos: DistritoRest[];
  distrito: DistritoRest;
  mostrarHabilitacion: boolean;
  roles: string[];

  constructor(
    private readonly buscadorService: BuscadorService,
    private readonly distritoService: DistritoService,
    public matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion = this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_ADMIN_BANCO');
    this.distritoService.obtenerDistritos().subscribe(distritos => {
      this.distritos = distritos;
      this.establecerDatasource(distritos);
    });
  }

  establecerDatasource(distritos: DistritoRest[]): void {
    this.dataSource = new MatTableDataSource(distritos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  nuevo(): void {
    const data = {
      titulo: TituloDistrito.creacion,
      tipo: TipoModal.creacion
    };
    this.abrirModalDistrito(data);
  }

  consultar(distrito: DistritoRest): void {
    const data = {
      titulo: TituloDistrito.consulta,
      tipo: TipoModal.consulta,
      distrito
    };
    this.abrirModalDistrito(data);
  }

  editar(distrito: DistritoRest): void {
    const data = {
      titulo: TituloDistrito.actualizacion,
      tipo: TipoModal.actualizacion,
      distrito
    };
    this.abrirModalDistrito(data);
  }

  abrirModalDistrito( data: any ): void {
    const dialog = this.matDialog.open(AgregarDistritoComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '20rem',
      panelClass: 'no-padding',
      data,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.distritoService.obtenerDistritos().subscribe(distritos => {
          this.distritos = distritos;
          this.establecerDatasource(distritos);
        });
        this.openSnackBar(result);
      }
    });
  }


  abrirModalHabilitacion(distrito: DistritoRest): void {
    const data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: true,
    };
    const dialog = this.matDialog.open(ConfirmModalComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '20rem',
      data
    });

    dialog.afterClosed().subscribe((result) => {
      if (result.state) {
        // tslint:disable-next-line:no-shadowed-variable
        this.distritoService
          .cambiarEstado(distrito.idDistrito)
          .subscribe(() => {
            this.distritoService.obtenerDistritos().subscribe(distritos => {
              this.distritos = distritos;
              this.establecerDatasource(distritos);
            });
          });
      } else {
        this.distritoService.obtenerDistritos().subscribe(distritos => {
          this.distritos = distritos;
          this.establecerDatasource(distritos);
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


  filtrarDistritos(value: string): void {
    const TERMINO = 'nombre';
    const bancos = this.buscadorService.buscarTermino(this.distritos, TERMINO, value);
    this.establecerDatasource(bancos);
  }
}
