import {Banco} from '../../modelo/Banco';
import {Router} from '@angular/router';
import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AgregarBancoComponent} from '../agregar-banco/agregar-banco.component';
import {ConfirmModalComponent} from '../../shared/confirm-modal/confirm-modal.component';
import {BancosService} from '../../service/bancos.service';
import {ServiceReportService} from '../../service/service-report.service';
import {PdfExportService} from '../../service/pdf-export.service';
import {BancoExcel} from '../../modelo/BancoExcel';
import {ExcelExportService} from '../../service/excel-export.service';

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

  constructor(
    private service: BancosService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService,
    private excelService: ExcelExportService,
    public matDialog: MatDialog,
  ) {
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.service.listarBancosTodos().subscribe(data => {
      this.bancos = data.data;
      this.bancoFilter = data.data;
    });
  }

  // tslint:disable-next-line: typedef
  filtrarBanco(event: any) {
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

  // tslint:disable-next-line: typedef
  newBanco() {
    this.toUpdateBank = null;
    this.consultingBank = false;
    this.openDialog();
  }

  // tslint:disable-next-line:typedef
  modificarBanco(banco: Banco) {
    this.toUpdateBank = banco;
    this.consultingBank = false;
    this.openDialog();
  }

  // tslint:disable-next-line:typedef
  consultarBanco(banco: Banco) {
    this.toUpdateBank = banco;
    this.consultingBank = true;
    this.openDialog();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
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

  // tslint:disable-next-line:typedef
  backPage() {
    window.history.back();
  }

  // tslint:disable-next-line:typedef
  showModal(banco: Banco) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
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

  // tslint:disable-next-line: typedef
  getData() {
    this.service.listarBancosTodos().subscribe(data => {
      this.bancos = data.data;
      this.bancoFilter = data.data;
    });
  }

  // tslint:disable-next-line: typedef
  exportarExcel() {
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

  // tslint:disable-next-line: typedef
  exportarPDF() {
    this.serviceReport.getReporteBancoPdf().subscribe(resp => {
      this.servicePdf.createAndDownloadBlobFile(this.servicePdf.base64ToArrayBuffer(resp.data.file), resp.data.name);
    });
  }
}
