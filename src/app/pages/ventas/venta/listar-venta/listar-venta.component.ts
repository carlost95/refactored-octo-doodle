
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PedidosService } from '@service/pedidos.service';
import { Pedido } from '@models/pedido';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SnackConfirmComponent } from '@shared/snack-confirm/snack-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from '@service/token.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BuscadorService } from '@shared/helpers/buscador.service';
import { Router } from '@angular/router';
import { Venta } from '../../../../models/Venta';
import { VentasService } from '../../../../service/ventas.service';

@Component({
  selector: 'app-listar-venta',
  templateUrl: './listar-venta.component.html',
  styleUrls: ['./listar-venta.component.scss']
})
export class ListarVentaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Pedido>;
  displayedColumns: string[] = [
    'nroVenta',
    'nombreCliente',
    'total',
    'descuento',
    'fecha',
    'acciones',
  ];

  ventas: Venta[] = [];
  venta: Venta;
  mostrarHabilitacion: boolean;
  roles: string[];

  constructor(
    private readonly ventaService: VentasService,
    private readonly buscadorService: BuscadorService,
    private readonly tokenService: TokenService,
    private readonly router: Router,
    private snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion =
      this.roles.includes('ROLE_ADMIN') ||
      this.roles.includes('ROLE_ADMIN_BANCO');

    this.ventaService.getSales().subscribe(ventas => {
      this.ventas = ventas;
      this.establecerDatasource(ventas);
    });
  }

  establecerDatasource(ventas: Venta[]): void {
    this.dataSource = new MatTableDataSource(ventas);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }

  nuevo(): void {
    this.router.navigate([`/ventas/agregar-venta`]);
  }

  filtrarVenta(value: string): void {
    const TERMINO = 'nombreCliente';
    // TODO: remove por valores de ventas
    const ventas = this.buscadorService.buscarTermino(
      this.ventas,
      TERMINO,
      value
    );
    this.establecerDatasource(ventas);
  }

  consultar(row: Venta) {
    this.router.navigate([`/ventas/consultar-venta/${row.idVenta}`]);
  }
}
