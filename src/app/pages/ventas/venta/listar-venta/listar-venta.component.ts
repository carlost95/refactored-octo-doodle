
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
    'descuento',
    'monto',
    'fecha',
    'acciones',
  ];

  pedidos: Pedido[] = [];
  pedido: Pedido;
  mostrarHabilitacion: boolean;
  roles: string[];

  constructor(
    private readonly pedidoService: PedidosService,
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

    this.pedidoService.obtenerPedidos().subscribe(pedidos => {
      this.pedidos = pedidos;
      this.establecerDatasource(pedidos);
      console.log(pedidos);
    });
  }

  establecerDatasource(pedidos: Pedido[]): void {
    this.dataSource = new MatTableDataSource(pedidos);
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
    const pedidos = this.buscadorService.buscarTermino(
      this.pedidos,
      TERMINO,
      value
    );
    this.establecerDatasource(pedidos);
  }

  consultar(row) {
    this.router.navigate([`/ventas/consultar-venta/${row.idVenta}`]);
  }
}
  // busqueda: string;
  // ventas: null;
  // ventasFilter: any;
  // toUpdate: boolean;
  // consulting: boolean;

  // constructor(private router: Router,
  //   private snackBar: MatSnackBar,
  //   public matDialog: MatDialog) {
  // }

  // ngOnInit(): void {
  // }

  // nuevaVenta(): void {
  //   this.toUpdate = null;
  //   this.consulting = false;
  //   this.openDialog();
  // }

  // filtrarVenta(): void {

  // }

  // openDialog(): void {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.id = 'modal-component';
  //   dialogConfig.height = '90%';
  //   dialogConfig.width = '90%';
  //   dialogConfig.data = {
  //     cliente: this.toUpdate,
  //     consulting: this.consulting
  //   };
  //   const modalDialog = this.matDialog.open(AgregarVentaComponent, dialogConfig);
  //   modalDialog.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.openSnackBar();
  //     }
  //     this.getData();
  //   });
  // }

  // getData(): void {
  //   // this.service.getAll().subscribe((data) => {
  //   //   this.clientes = data.data;
  //   //   this.clientesFilter = data.data;
  //   // });
  // }

  // backPage(): void {
  //   this.router.navigate(['venta']);
  // }

  // consultVenta(venta: any): void {

  // }

  // openSnackBar(): void {
  //   this.snackBar.openFromComponent(SnackConfirmComponent, {
  //     panelClass: ['error-snackbar'],
  //     duration: 5 * 1000,
  //   });
  // }
// }
