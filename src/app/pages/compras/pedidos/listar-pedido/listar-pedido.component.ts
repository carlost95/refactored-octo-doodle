import {PedidosService} from '@service/pedidos.service';
import {Pedido} from '@models/pedido';
import {Component, OnInit, ViewChild} from '@angular/core';
import {SnackConfirmComponent} from '@shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TokenService} from '@service/token.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {BuscadorService} from '@shared/helpers/buscador.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-listar-pedido',
  templateUrl: './listar-pedido.component.html',
  styleUrls: ['./listar-pedido.component.css']
})
export class ListarPedidoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Pedido>;
  displayedColumns: string[] = [
    'nombre',
    'descripcion',
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
    });
  }

  establecerDatasource(pedidos: Pedido[]): void {
    this.dataSource = new MatTableDataSource(pedidos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // tslint:disable-next-line: typedef


  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }

  nuevo(): void {
    this.router.navigate([`/compras/agregar-pedido`]);
  }

  filtrarPedido(value: string): void {
    const TERMINO = 'nombre';
    const pedidos = this.buscadorService.buscarTermino(
      this.pedidos,
      TERMINO,
      value
    );
    this.establecerDatasource(pedidos);
  }

  consultar(row) {

  }
}
