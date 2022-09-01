import {MatDialog} from '@angular/material/dialog';
import {ConfirmModalComponent} from '@shared/confirm-modal/confirm-modal.component';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MarcasService} from '@service/marcas.service';
import {AgregarMarcaComponent} from '../agregar-marca/agregar-marca.component';
import {TokenService} from '@service/token.service';
import {SnackConfirmComponent} from '@shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MarcaRest} from '../../../../models/marca-rest';
import {BuscadorService} from '../../../../shared/helpers/buscador.service';
import {TipoModal} from '../../../../shared/models/tipo-modal.enum';
import {TituloMarca} from '../models/titulo-marca.enum';

@Component({
  selector: 'app-listar-marca',
  templateUrl: './listar-marca.component.html',
  styleUrls: ['./listar-marca.component.css']
})
export class ListarMarcaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<MarcaRest>;
  displayedColumns: string[] = ['nombre', 'abreviatura', 'habilitado', 'acciones'];

  marcas: MarcaRest[];
  marca: MarcaRest;
  mostrarHabilitacion: boolean;
  roles: string[];

  constructor(
    private readonly marcasService: MarcasService,
    private readonly buscadorService: BuscadorService,
    public matDialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion = this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_ADMIN_BANCO');
    this.marcasService.obtenerMarcas().subscribe(marcas => {
      this.marcas = marcas;
      this.establecerDatasource(marcas);
    });
  }

  establecerDatasource(marcas: MarcaRest[]): void {
    this.dataSource = new MatTableDataSource(marcas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  nueva(): void {
    const data = {
      titulo: TituloMarca.creacion,
      tipo: TipoModal.creacion
    };
    this.openDialog(data);
  }

  consultar(marca: MarcaRest): void {
    const data = {
      titulo: TituloMarca.consulta,
      tipo: TipoModal.consulta,
      marca
    };
    this.openDialog(data);
  }

  editar(marca: MarcaRest): void {
    const data = {
      titulo: TituloMarca.actualizacion,
      tipo: TipoModal.actualizacion,
      marca
    };
    this.openDialog(data);
  }

  openDialog(data: any): void {
    const dialog = this.matDialog.open(AgregarMarcaComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '20rem',
      panelClass: 'no-padding',
      data,
    });

    dialog.afterClosed().subscribe(result => {
      this.marcasService.obtenerMarcas().subscribe(marcas => {
        this.marcas = marcas;
        this.establecerDatasource(marcas);
      });
      if (result) {
        this.openSnackBar(result);
      }
    });
  }

  abrirModalHabilitacion(marca: MarcaRest): void {
    const dialog = this.matDialog.open(ConfirmModalComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '20rem',
      data: {
        message: '¿Desea cambiar estado?',
        title: 'Cambio estado',
        state: marca.habilitado,
      }
    });
    dialog.afterClosed().subscribe(result => {
      if (result.state) {
        // tslint:disable-next-line:no-shadowed-variable
        this.marcasService.cambiarEstado(marca.idMarca).subscribe(result => {
          this.marcasService.obtenerMarcas().subscribe(marcas => {
            this.marcas = marcas;
            this.establecerDatasource(marcas);
          });
        });
      } else {
        this.marcasService.obtenerMarcas().subscribe(marcas => {
          this.marcas = marcas;
          this.establecerDatasource(marcas);
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

  filtrarMarcas(value: string): void {
    const TERMINO = 'nombre';
    const bancos = this.buscadorService.buscarTermino(this.marcas, TERMINO, value);
    this.establecerDatasource(bancos);
  }

}
