import { Component, OnInit, ViewChild } from '@angular/core';
import { TituloAccount } from '../../../../shared/models/titulo-account.enum';
import { TipoModal } from '@shared/models/tipo-modal.enum';
import { BuscadorService } from '../../../../shared/helpers/buscador.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenService } from '../../../../service/token.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BancosService } from '../../../../service/bancos.service';
import { CuentaService } from '../../../../service/cuenta.service';
import { Cuenta } from '../../../../models/Cuenta';

@Component({
  selector: 'app-listar-cuentas',
  templateUrl: './listar-cuentas.component.html',
  styleUrls: ['./listar-cuentas.component.scss'],
})
export class ListarCuentasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Cuenta>;
  displayedColumns: string[] = [
    'numero',
    'cbu',
    'alias',
    'habilitado',
    'acciones',
  ];

  cuentas: Cuenta[];

  mostrarHabilitacion: boolean;
  cuenta: Cuenta;
  roles: string[];

  constructor(
    private readonly buscadorService: BuscadorService,
    public matDialog: MatDialog,
    private router: Router,
    private tokenService: TokenService,
    private snackBar: MatSnackBar,
    private readonly service: CuentaService
  ) {}

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion =
      this.roles.includes('ROLE_ADMIN') ||
      this.roles.includes('ROLE_ADMIN_BANCO');

    this.service.getAccountBankByIdProveedor(1).subscribe((data) => {
      console.log('Cuentas' + data[0]);

      this.cuentas = data;
      this.establecerDatasource(data);
    });
  }

  newAccount(): void {
    const data = {
      titulo: TituloAccount.creacion,
      tipo: TipoModal.creacion,
    };
  }
  filtrarAccount(value: string): void {
    const TERMINO = 'nombre';
    const bancos = this.buscadorService.buscarTermino(
      //se debe eliminar la linea de abajo y colocar cuentas
      this.cuentas,
      TERMINO,
      value
    );
    this.establecerDatasource(bancos);
  }

  establecerDatasource(data): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
