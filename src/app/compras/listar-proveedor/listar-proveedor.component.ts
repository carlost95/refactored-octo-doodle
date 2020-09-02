import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceReportService } from '../../service/service-report.service';
import { PdfExportService } from 'src/app/service/pdf-export.service';
import { ExcelExportService } from 'src/app/service/excel-export.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { ProveedoresService } from '../../service/proveedores.service';
import { Proveedor } from '../../modelo/Proveedor';
import { AgregarProveedorComponent } from '../agregar-proveedor/agregar-proveedor.component';
import { proveedor } from '../../../environments/global-route';

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
  toUpdateProveedor: any;

  constructor(
    private router: Router,
    private proveedorService: ProveedoresService,
    public matDialog: MatDialog,
    private excelService: ExcelExportService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService) { }

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
  deshabilitarProveedor(proveedor: Proveedor) {

  }
  // tslint:disable-next-line: typedef
  exportarExcel() { }
  // tslint:disable-next-line: typedef
  exportarPDF() { }
  // tslint:disable-next-line: typedef
  newProveedor() {
    this.toUpdateProveedor = null;
    this.openDialogProveedor();
  }

  // tslint:disable-next-line: typedef
  modificarProveedor(proveedor: Proveedor) {
    this.toUpdateProveedor = proveedor;
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
    dialogConfig.data = this.toUpdateProveedor;
    const modalDialog = this.matDialog.open(AgregarProveedorComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.proveedorService.listarProveedoresTodos().subscribe(data => {
        this.proveedores = data.data;
        this.proveedoresFilter = data.data;
      });
    });
  }
  // tslint:disable-next-line: typedef
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
