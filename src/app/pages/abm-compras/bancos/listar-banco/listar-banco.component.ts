import {Banco} from '../../../../models/Banco';
import {Router} from '@angular/router';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AgregarBancoComponent} from '../agregar-banco/agregar-banco.component';
import {ConfirmModalComponent} from '../../../../shared/confirm-modal/confirm-modal.component';
import {BancosService} from '../../../../service/bancos.service';
import {TokenService} from '../../../../service/token.service';
import {SnackConfirmComponent} from '../../../../shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {BancoRest} from '../../../../models/banco-rest';
import {BuscadorService} from '../../../../shared/helpers/buscador.service';

@Component({
  selector: 'app-listar-banco',
  templateUrl: './listar-banco.component.html',
  styleUrls: ['./listar-banco.component.css']
})
export class ListarBancoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<BancoRest>;
  displayedColumns: string[] = ['nombre', 'abreviatura', 'habilitado', 'acciones'];

  bancos: BancoRest[];

  mostrarHabilitacion: boolean;

  banco: BancoRest;
  roles: string[];

  constructor(
    private readonly buscadorService: BuscadorService,
    private readonly service: BancosService,
    public matDialog: MatDialog,
    private router: Router,
    private tokenService: TokenService,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.roles = this.tokenService.getAuthorities();
    this.mostrarHabilitacion = this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_ADMIN_BANCO');
    this.service.obtenerBancos().subscribe(data => {
      this.bancos = data;
      this.establecerDatasource(data);
    });
  }

  filtrarBancos(value: string): void {
    const TERMINO = 'nombre';
    const bancos = this.buscadorService.buscarTermino(this.bancos, TERMINO, value);
    this.establecerDatasource(bancos);
  }

  establecerDatasource(bancos: BancoRest[]): void {
    this.dataSource = new MatTableDataSource(bancos);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  newBanco(): void {
    // this.toUpdateBank = null;
    // this.consultingBank = false;
    this.openDialog();
  }

  modificarBanco(banco: Banco): void {
    // this.toUpdateBank = banco;
    // this.consultingBank = false;
    this.openDialog();
  }

  consultarBanco(banco: Banco): void {
    // this.toUpdateBank = banco;
    // this.consultingBank = true;
    this.openDialog();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    // dialogConfig.data = {
    //   bank: this.toUpdateBank,
    //   consulting: this.consultingBank
    // };
    const modalDialog = this.matDialog.open(AgregarBancoComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.service.listarBancosTodos().subscribe(data => {
        this.bancos = data.data;
      });
      if (result) {
        this.openSnackBar(result);
      }
      this.getData();
    });
  }

  backPage(): void {
    this.router.navigate(['abm-compras']);
  }

  showModal(banco: Banco): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: banco.habilitado
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        // tslint:disable-next-line:no-shadowed-variable
        this.service.cambiarHabilitacion(banco.id).subscribe(result => {
          this.getData();
        });
      } else {
        this.getData();
      }
    });
  }

  getData(): void {
    this.service.listarBancosTodos().subscribe(data => {
      this.bancos = data.data;
      // this.bancoFilter = data.data;
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
