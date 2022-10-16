import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Remito } from '../../../../models/Remito';
import { MatTableDataSource } from '@angular/material/table';
import { RemitoService } from '../../../../service/remito.service';
import { BuscadorService } from '../../../../shared/helpers/buscador.service';
import { TokenService } from '../../../../service/token.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { cliente } from '../../../../../environments/global-route';


@Component({
  selector: 'app-listar-remitos',
  templateUrl: './listar-remitos.component.html',
  styleUrls: ['./listar-remitos.component.scss']
})
export class ListarRemitosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Remito>;
  displayedColumns: string[] = [
    'nroRemito',
    'nombreCliente',
    'direccion',
    'fecha',
    'acciones',
  ];

  remitos: Remito[] = [];
  remito: Remito;;
  mostrarHabilitacion: boolean;
  roles: string[];

  constructor(
    private readonly remitoService: RemitoService,
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

    this.remitoService.getAllRemitos().subscribe(remitos => {
      this.remitos = remitos;
      this.establecerDatasource(remitos);
      console.log(remitos);

    });
  }
  establecerDatasource(remitos: Remito[]): void {
    this.dataSource = new MatTableDataSource(remitos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filtrarRemitos(value: string): void {
    const TERMINO = 'nroRemito';
    const remitos = this.buscadorService.buscarTerminoNumber(
      this.remitos,
      TERMINO,
      value
    );
    this.establecerDatasource(remitos);
  }
  consultar(row: Remito) {
    this.router.navigate([`/ventas/consultar-remito/${row.idRemito}`]);
  }
}
