import { Router } from '@angular/router';
import { Cliente } from '../../../models/cliente';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackConfirmComponent } from '../../../shared/snack-confirm/snack-confirm.component';
import { ConfirmModalComponent } from '../../../shared/confirm-modal/confirm-modal.component';
import { ClienteService } from '../../../service/cliente.service';
import { TokenService } from '../../../service/token.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BuscadorService } from '../../../shared/helpers/buscador.service';
import { TituloCliente } from '../../../shared/models/titulo-cliente.enum';
import { TipoModal } from '../../../shared/models/tipo-modal.enum';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Cliente>;
  displayedColumns: string[] = [
    'apellido',
    'dni',
    'contacto',
    'status',
    'acciones',
  ];

  clientes: Cliente[];
  mostrarModificacion: boolean;

  cliente: Cliente = new Cliente();
  roles: string[];

  constructor(
    private readonly buscadorService: BuscadorService,
    private clientService: ClienteService,
    private router: Router,
    public matDialog: MatDialog,
    private tokenService: TokenService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarModificacion =
      this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_GERENTE');
    this.clientService.getAllClient().subscribe((resp) => {
      this.clientes = resp;
      this.establecerDatasource(this.clientes);
    });
  }

  filtrarClient(value: string): void {
    const TERMINO = 'apellido';
    const clientes = this.buscadorService.buscarTermino(
      this.clientes,
      TERMINO,
      value
    );
    this.establecerDatasource(clientes);
  }
  establecerDatasource(clientes: Cliente[]): void {
    this.dataSource = new MatTableDataSource(clientes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  newClient(): void {
    const data = {
      titulo: TituloCliente.creacion,
      tipoModal: TipoModal.creacion,
    };
    this.openDialog(data);
  }
  consultClient(cliente: Cliente): void {
    const data = {
      titulo: TituloCliente.consulta,
      tipoModal: TipoModal.consulta,
      cliente,
    };
    this.openDialog(data);
  }
  updatedClient(cliente: Cliente): void {
    const data = {
      titulo: TituloCliente.actualizacion,
      tipoModal: TipoModal.actualizacion,
      cliente,
    };
    this.openDialog(data);
  }
  direcciones(idCliente: number): void {
    console.log(idCliente);

    this.router.navigate([`/ventas/direcciones/${idCliente}`]);
  }

  openDialog(data: any): void {
    const dialog = this.matDialog.open(AgregarClienteComponent, {
      id: 'modal-component',
      disableClose: true,
      height: 'auto',
      width: '20rem',
      data,
      panelClass: 'no-padding',
    });
    dialog.afterClosed().subscribe((result) => {
      this.clientService.getAllClient().subscribe((clientes) => {
        this.clientes = clientes;
        this.establecerDatasource(this.clientes);
      });
      if (result) {
        this.openSnackBar(result);
      }
    });
  }
  showModal(cliente: Cliente): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '15rem';
    dialogConfig.width = '20rem';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: cliente.status,
    };
    const modalDialog = this.matDialog.open(
      ConfirmModalComponent,
      dialogConfig
    );
    modalDialog.afterClosed().subscribe((result) => {
      if (result.state) {
        this.clientService
          .changeStatusClient(cliente.idCliente)
          .pipe(concatMap((data) => this.clientService.getAllClient()))
          .subscribe((clientes) => {
            this.clientes = clientes;
            this.establecerDatasource(this.clientes);
          });
        this.openSnackBar('Estado actualizado');
      } else {
        this.openSnackBar('Error en la actualizacion');
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
}
