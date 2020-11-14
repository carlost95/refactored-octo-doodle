import {Banco} from '../../../models/Banco';
import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AgregarBancoComponent} from '../agregar-banco/agregar-banco.component';
import {ConfirmModalComponent} from '../../../shared/confirm-modal/confirm-modal.component';
import {BancosService} from '../../../service/bancos.service';
import {ServiceReportService} from '../../../service/service-report.service';
import {PdfExportService} from '../../../service/pdf-export.service';
import {BancoExcel} from '../../../models/BancoExcel';
import {ExcelExportService} from '../../../service/excel-export.service';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'app-listar-banco',
  templateUrl: './listar-banco.component.html',
  styleUrls: ['./listar-banco.component.css']
})
export class ListarBancoComponent implements OnInit {
  banco: Banco = null;
  bancos: Banco[] = null;
  bancoFilter: Banco[] = null;
  busqueda: string = null;
  toUpdateBank: Banco;
  consultingBank: boolean;
  bancoExcel: BancoExcel;
  bancosExcel: BancoExcel[] = [];

  isLogged = false;
  roles: string[];
  isAdmin = false;
  isGerente = false;

  constructor(
    private service: BancosService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService,
    private excelService: ExcelExportService,
    public matDialog: MatDialog,
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      } else if (rol === 'ROLE_GERENTE') {
        this.isGerente = true;
      }
    });
    this.service.listarBancosTodos().subscribe(data => {
      this.bancos = data.data;
      this.bancoFilter = data.data;
    });
  }

  filtrarBanco(event: any): void {
    this.busqueda = this.busqueda.toLowerCase();
    this.bancoFilter = this.bancos;
    if (this.busqueda !== null) {
      this.bancoFilter = this.bancos.filter(item => {
        const nombre = item.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
        const abreviatura = item.abreviatura.toLowerCase().indexOf(this.busqueda) !== -1;
        return nombre || abreviatura;
      });
    }
  }

  newBanco(): void {
    this.toUpdateBank = null;
    this.consultingBank = false;
    this.openDialog();
  }

  modificarBanco(banco: Banco): void {
    this.toUpdateBank = banco;
    this.consultingBank = false;
    this.openDialog();
  }

  consultarBanco(banco: Banco): void {
    this.toUpdateBank = banco;
    this.consultingBank = true;
    this.openDialog();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = {
      bank: this.toUpdateBank,
      consulting: this.consultingBank
    };
    const modalDialog = this.matDialog.open(AgregarBancoComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.service.listarBancosTodos().subscribe(data => {
        this.bancos = data.data;
        this.bancoFilter = data.data;
      });
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
      this.bancoFilter = data.data;
    });
  }

  exportarExcel(): void {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.bancoFilter.length; index++) {
      this.bancoExcel = new BancoExcel(0, '', '');
      if (this.bancoFilter[index] !== null) {
        this.bancoExcel.id = this.bancoFilter[index].id;
        this.bancoExcel.nombre = this.bancoFilter[index].nombre;
        this.bancoExcel.abreviatura = this.bancoFilter[index].abreviatura;
      }
      this.bancosExcel.push(this.bancoExcel);
    }
    this.excelService.exportToExcel(this.bancosExcel, 'Reporte Banco');
  }

  exportarPDF(): void {
    this.serviceReport.getReporteBancoPdf().subscribe(resp => {
      this.servicePdf.createAndDownloadBlobFile(this.servicePdf.base64ToArrayBuffer(resp.data.file), resp.data.name);
    });
  }
}
