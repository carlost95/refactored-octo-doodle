import { ComprasService } from './../../service/compras.service';
import { Proveedor } from './../../modelo/Proveedor';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServiceReportService } from '../../service/service-report.service';
import { PdfExportService } from 'src/app/service/pdf-export.service';
import { ExcelExportService } from 'src/app/service/excel-export.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { AgregarProveedorComponent } from '../agregar-proveedor/agregar-proveedor.component';
import { ProveedoresService } from '../../service/proveedores.service';

@Component({
  selector: 'app-listar-proveedor',
  templateUrl: './listar-proveedor.component.html',
  styleUrls: ['./listar-proveedor.component.css']
})
export class ListarProveedorComponent implements OnInit {
  proveedor: Proveedor = null;
  proveedores: Proveedor[] = null;
  proveedoresFilter: Proveedor[] = null;
  busquedaTelefono: string = null;
  busqueda: string = null;

  constructor(
    private router: Router,
    private proveedorService: ProveedoresService,
    public matDialog: MatDialog,
    private excelService: ExcelExportService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService) { }

  ngOnInit() {
    this.proveedorService.listarProveedoresTodos().subscribe(prov => {
      this.proveedores = prov.data;
      this.proveedoresFilter = prov.data;
    });
  }
  // tslint:disable-next-line: typedef
  filtrarProveedor(event: any) {
    this.busqueda = this.busqueda.toLowerCase();
    this.proveedoresFilter = this.proveedores;

    if (this.busqueda !== null) {
      this.proveedoresFilter = this.proveedores.filter(item => {
        const inName = item.razonSocial.toLowerCase().indexOf(this.busqueda) !== -1;
        const firstNumber = item.celular.toLowerCase().indexOf(this.busqueda) !== -1;
        const twoNumber = item.telefono.toLowerCase().indexOf(this.busqueda) !== -1;
        return inName || twoNumber || firstNumber;
      });
    }
  }
  // tslint:disable-next-line: typedef
  exportarExcel() { }
  // tslint:disable-next-line: typedef
  exportarPDF() { }
  // tslint:disable-next-line: typedef
  newProveedor() { }

  // tslint:disable-next-line: typedef
  modificarProveedor() { }
  // tslint:disable-next-line: typedef
  deshabilitarProveedor() { }

  // tslint:disable-next-line: typedef
  backPage() {
    window.history.back();
  }
  showModal(proveedor: Proveedor) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: 'Desea cambiar estado?',
      title: 'Cambio estado',
      state: proveedor.habilitado
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        this.proveedorService.cambiarHabilitacion(proveedor.id).subscribe(result => {
          this.getData();
        })
      } else {
        this.getData();
      }
    });
  }
  getData() {
    this.proveedorService.listarProveedoresTodos().subscribe(data => {
      this.proveedores = data.data;
      this.proveedoresFilter = data.data;
    });
  }
}
