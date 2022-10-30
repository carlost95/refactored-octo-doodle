import { AjustesService } from './../../../service/ajustes.service';
import { Ajuste } from './../../../models/Ajuste';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BuscadorService } from '../../../shared/helpers/buscador.service';
import { TokenService } from '../../../service/token.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ajustes',
  templateUrl: './ajustes.component.html',
  styleUrls: ['./ajustes.component.scss']
})
export class AjustesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Ajuste>;
  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'fecha',
    'acciones',
  ];

  mostrarHabilitacion: boolean;
  roles: string[];
  ajustes: Ajuste[];


  constructor(
    private ajusteService: AjustesService,
    private readonly buscadorService: BuscadorService,
    private readonly tokenService: TokenService,
    private readonly router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion =
      this.roles.includes('ROLE_ADMIN') ||
      this.roles.includes('ROLE_GERENTE');

    this.ajusteService.getAllAjustes().subscribe(ajustes => {
      this.ajustes = ajustes;
      this.establecerDatasource(this.ajustes);
    });
  }
  establecerDatasource(ajustes: Ajuste[]): void {
    this.dataSource = new MatTableDataSource(ajustes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filtrarAjuste(value: string): void {
    const TERMINO = 'nombre';
    const ajustes = this.buscadorService.buscarTermino(
      this.ajustes,
      TERMINO,
      value
    );
    this.establecerDatasource(ajustes);
  }
  newAjuste() {
    this.router.navigate([`/abm-compras/agregar-ajuste`]);
  }
  consultar(row: Ajuste) {
    this.router.navigate([`/abm-compras/consultar-ajuste/${row.idAjuste}`]);
  }
}
