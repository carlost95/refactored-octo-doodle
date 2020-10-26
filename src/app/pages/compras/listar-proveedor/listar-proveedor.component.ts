import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {ServiceReportService} from '../../../service/service-report.service';
import {PdfExportService} from 'src/app/service/pdf-export.service';
import {ExcelExportService} from 'src/app/service/excel-export.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../../../shared/confirm-modal/confirm-modal.component';
import {ProveedoresService} from '../../../service/proveedores.service';
import {Proveedor} from '../../../modelo/Proveedor';
import {AgregarProveedorComponent} from '../agregar-proveedor/agregar-proveedor.component';
import {proveedor} from '../../../../environments/global-route';
import {ProveedorExcel} from '../../../modelo/ProveedorExcel';

@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.css']
})
export class ListarProveedorComponent implements OnInit {
  proveedor: Proveedor = null;
  proveedores: Proveedor[] = null;
  proveedoresFilter: Proveedor[] = null;
  busqueda: string = null;
  toUpdateProveedor: any = null;
  consulting: boolean;
  proveedoresExcel: ProveedorExcel[] = [];
  proveedorExcel: ProveedorExcel;

  constructor(
    private router: Router,
    private proveedorService: ProveedoresService,
    public matDialog: MatDialog,
    private excelService: ExcelExportService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService) {
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.proveedorService.listarProveedoresTodos().subscribe(data => {
      this.proveedores = data.data;
      this.proveedoresFilter = data.data;
    });
  }

  // tslint:disable-next-line: typedef
  filtrarProveedor(event: any) {
    this.busqueda = this.busqueda.toLowerCase();
    this.proveedoresFilter = this.proveedores;
    if (this.busqueda !== null) {
      this.proveedoresFilter = this.proveedores.filter(item => {
        const inName = item.razonSocial.toLowerCase().indexOf(this.busqueda) !== -1;
        return inName;
      });
    }
  }

  // tslint:disable-next-line: typedef
  exportarExcel() {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.proveedoresFilter.length; index++) {
      this.proveedorExcel = new ProveedorExcel('', '', '', '', '');
      if (this.proveedoresFilter[index] != null) {
        this.proveedorExcel.razonSocial = this.proveedoresFilter[index].razonSocial;
        this.proveedorExcel.domicilio = this.proveedoresFilter[index].domicilio;
        this.proveedorExcel.mail = this.proveedoresFilter[index].mail;
        this.proveedorExcel.telefono = this.proveedoresFilter[index].telefono;
        this.proveedorExcel.celular = this.proveedoresFilter[index].celular;
      }
      this.proveedoresExcel.push(this.proveedorExcel);
    }
    this.excelService.exportToExcel(this.proveedoresExcel, 'Reporte Proveedores');
  }

  // tslint:disable-next-line: typedef
  exportarPDF() {
    this.serviceReport.getReporteProveedorPdf().subscribe(resp => {
      this.servicePdf.createAndDownloadBlobFile(this.servicePdf.base64ToArrayBuffer(resp.data.file), resp.data.name);
    });
  }

  // tslint:disable-next-line: typedef
  newProveedor() {
    this.toUpdateProveedor = null;
    this.consulting = false;
    this.openDialogProveedor();
  }

  // tslint:disable-next-line:typedef no-shadowed-variable
  modificarProveedor(proveedor: Proveedor) {
    this.toUpdateProveedor = proveedor;
    this.consulting = false;
    this.openDialogProveedor();
  }

  // tslint:disable-next-line:typedef no-shadowed-variable
  consultarProveedor(proveedor: Proveedor) {
    this.toUpdateProveedor = proveedor;
    this.consulting = true;
    this.openDialogProveedor();
  }

  // tslint:disable-next-line: typedef
  backPage() {
    window.history.back();
  }

  openDialogProveedor(): void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '600px';
    dialogConfig.width = '400px';
    dialogConfig.data = {
      provider: this.toUpdateProveedor,
      consulting: this.consulting
    };
    const modalDialog = this.matDialog.open(AgregarProveedorComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.proveedorService.listarProveedoresTodos().subscribe(data => {
        this.proveedores = data.data;
        this.proveedoresFilter = data.data;
      });
    });
  }

  // tslint:disable-next-line:typedef no-shadowed-variable
  showModal(proveedor: Proveedor) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: proveedor.habilitado
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        // tslint:disable-next-line:no-shadowed-variable
        this.proveedorService.cambiarHabilitacion(proveedor.id).subscribe(result => {
          this.getData();
        });
      } else {
        this.getData();
      }
    });
  }

  // tslint:disable-next-line: typedef
  getData() {
    this.proveedorService.listarProveedoresTodos().subscribe(data => {
      this.proveedores = data.data;
      this.proveedoresFilter = data.data;
    });
  }


}
