import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Empresa } from '../../../models/Empresa';
import { MatTableDataSource } from '@angular/material/table';
import { EmpresaService } from '../../../service/empresa.service';
import { BuscadorService } from '../../../shared/helpers/buscador.service';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from '../../../service/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipoModal } from '../../../shared/models/tipo-modal.enum';
import { AgregarEmpresaComponent } from './agregar-empresa/agregar-empresa.component';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { SnackConfirmComponent } from '../../../shared/snack-confirm/snack-confirm.component';
import { TituloEmpresa } from './models/titulo-empresa';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Empresa>;
  displayedColumns: string[] = ['razonSocial', 'cuit', 'telefono', 'status', 'acciones'];

  empresas: Empresa[];
  empresa: Empresa;
  mostrarHabilitacion: boolean;
  roles: string[];

  constructor(
    private readonly empresaService: EmpresaService,
    private readonly buscadorService: BuscadorService,
    public matDialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion = this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_ADMIN_BANCO');
    this.empresaService.getAllEmpresas().subscribe(data => {
      this.empresas = data;
      this.establecerDatasource(this.empresas);
    });
  }

  establecerDatasource(empresas: Empresa[]): void {
    this.dataSource = new MatTableDataSource(empresas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  nueva(): void {
    const data = {
      titulo: TituloEmpresa.creacion,
      tipo: TipoModal.creacion
    };
    this.openDialog(data);
  }

  consultar(empresa: Empresa): void {
    const data = {
      titulo: TituloEmpresa.consulta,
      tipo: TipoModal.consulta,
      empresa
    };
    this.openDialog(data);
  }

  editar(empresa: Empresa): void {
    const data = {
      titulo: TituloEmpresa.actualizacion,
      tipo: TipoModal.actualizacion,
      empresa
    };
    this.openDialog(data);
  }

  openDialog(data: any): void {
    const dialog = this.matDialog.open(AgregarEmpresaComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '25rem',
      panelClass: 'no-padding',
      data,
    });

    dialog.afterClosed().subscribe(result => {
      this.empresaService.getAllEmpresas().subscribe(data => {
        this.empresas = data;
        this.establecerDatasource(this.empresas);
      });
      if (result) {
        this.openSnackBar(result);
      }
    });
  }

  abrirModalHabilitacion(empresa: Empresa): void {
    const dialog = this.matDialog.open(ConfirmModalComponent, {
      disableClose: true,
      id: 'modal-component',
      height: 'auto',
      width: '20rem',
      data: {
        message: '¿Desea cambiar estado?',
        title: 'Cambio estado',
        state: empresa.status,
      }
    });
    dialog.afterClosed().subscribe(result => {
      if (result.state) {
        this.empresaService.changeStatusEmpresa(empresa.idEmpresa).subscribe(result => {
          this.empresaService.getAllEmpresas().subscribe(data => {
            this.empresas = data;
            this.establecerDatasource(this.empresas);
          });
        });
        this.openSnackBar('Estado actualizado')
      } else {
        this.openSnackBar('error al actualizar estado');
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

  filtrarEmpresa(value: string): void {
    const TERMINO = 'rasonSocial';
    const empresas = this.buscadorService.buscarTermino(this.empresas, TERMINO, value);
    this.establecerDatasource(empresas);
  }

}