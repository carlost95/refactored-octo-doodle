import { Rubro } from './../../modelo/Rubro';
import { Component, OnInit } from '@angular/core';
import { RubrosService } from '../../service/rubros.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { AgregarRubroComponent } from '../agregar-rubro/agregar-rubro.component';
import { ServiceReportService } from '../../service/service-report.service';
import { PdfExportService } from '../../service/pdf-export.service';
import { ExcelExportService } from '../../service/excel-export.service';
import { RubroExcel } from '../../modelo/RubroExcel';


@Component({
  selector: 'app-listar-rubro',
  templateUrl: './listar-rubro.component.html',
  styleUrls: ['./listar-rubro.component.css']
})
export class ListarRubroComponent implements OnInit {
  rubro: Rubro = null;
  rubros: Rubro[] = null;
  rubrosFilter: Rubro[] = null;
  busquedaNombre: string = null;
  busqueda: string = null;
  toUpdateRubro: Rubro;
  rubroExcel: RubroExcel;
  rubrosExcel: RubroExcel[] = [];

  constructor(
    private serviceRubro: RubrosService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService,
    private excelService: ExcelExportService,
    public matDialog: MatDialog
  ) { }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.serviceRubro.listarRubrosTodos().subscribe(data => {
      this.rubros = data.data;
      this.rubrosFilter = this.rubros;
    });
  }
  // tslint:disable-next-line: typedef
  modificarRubro(rubro: Rubro) {
    this.toUpdateRubro = rubro;
    this.openDialog();

  }
  // tslint:disable-next-line: typedef
  filtrarRubro(event: any) {
    if (this.busqueda !== null) {
      this.rubrosFilter = this.rubros.filter(item => {
        if (item.nombre.toUpperCase().includes(this.busqueda.toUpperCase())) {
          return item;
        }
      });
    } else {
      this.rubrosFilter = this.rubros;
    }
  }

  // tslint:disable-next-line: typedef
  backPage() {
    window.history.back();
  }
  // tslint:disable-next-line: typedef
  newRubro() {
    this.toUpdateRubro = null;
    this.openDialog();

  }
  // tslint:disable-next-line: typedef
  showModal(rubro: Rubro) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: 'Desea cambiar estado?',
      title: 'Cambio estado',
      state: rubro.habilitacion
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        this.serviceRubro.cambiarHabilitacion(rubro.id).subscribe(result => {
          this.getData();
        })
      } else {
        this.getData();
      }
    });
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = this.toUpdateRubro;
    const modalDialog = this.matDialog.open(AgregarRubroComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.serviceRubro.listarRubrosTodos().subscribe(data => {
        this.rubros = data.data;
        this.rubrosFilter = data.data;
      });
    });
  }
  // tslint:disable-next-line: typedef
  getData() {
    this.serviceRubro.listarRubrosTodos().subscribe(data => {
      this.rubros = data.data;
      this.rubrosFilter = data.data;
    });
  }
  exportarExcel(): void {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.rubrosFilter.length; index++) {
      this.rubroExcel = new RubroExcel(0, '', '');
      if (this.rubrosFilter[index] != null) {
        this.rubroExcel.id = this.rubrosFilter[index].id;
        this.rubroExcel.nombre = this.rubrosFilter[index].nombre;
        this.rubroExcel.descripcion = this.rubrosFilter[index].descripcion;
      }
      this.rubrosExcel.push(this.rubroExcel);

    }
    this.excelService.exportToExcel(this.rubrosExcel, 'Reporte Rubros');
  }
  // tslint:disable-next-line: typedef
  exportarPDF() {
    this.serviceReport.getReporteRubroPdf().subscribe(resp => {
      this.servicePdf.createAndDownloadBlobFile(this.servicePdf.base64ToArrayBuffer(resp.data.file), resp.data.name);
    });
  }
}
