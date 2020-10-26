import {SubRubroDTO} from './../../modelo/SubRubroDTO';
import {SubRubro} from './../../modelo/SubRubro';
import {Component, OnInit} from '@angular/core';
import {MatDialogConfig, MatDialog} from '@angular/material/dialog';
import {ServiceReportService} from '../../service/service-report.service';
import {PdfExportService} from '../../service/pdf-export.service';
import {ExcelExportService} from '../../service/excel-export.service';
import {AgregarSubRubroComponent} from '../agregar-sub-rubro/agregar-sub-rubro.component';
import {SubRubroService} from '../../service/sub-rubro.service';
import {ConfirmModalComponent} from '../../shared/confirm-modal/confirm-modal.component';
import {SubRubroExcel} from '../../modelo/SubRubroExcel';

@Component({
  selector: 'app-listar-sub-rubro',
  templateUrl: './listar-sub-rubro.component.html',
  styleUrls: ['./listar-sub-rubro.component.css']
})
export class ListarSubRubroComponent implements OnInit {
  subRubros: SubRubro[] = null;
  subRubrosFilter: SubRubro[] = null;
  busqueda: string = null;
  toUpdateSubRubro: SubRubro;
  subRubroExcel: SubRubroExcel;
  subRubrosExcel: SubRubroExcel[] = [];
  consulting: boolean;

  constructor(
    private subRubroService: SubRubroService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService,
    private excelService: ExcelExportService,
    public matDialog: MatDialog
  ) {
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.subRubroService.listarSubRubrosTodos().subscribe(data => {
      this.subRubros = data.data;
      this.subRubrosFilter = data.data;
      // tslint:disable-next-line: no-shadowed-variable
      const rubro = this.subRubros[0].rubroId;
    });


  }

  // tslint:disable-next-line: typedef
  newSubRubro() {
    this.toUpdateSubRubro = null;
    this.consulting = false;
    this.openDialog();
  }

  // tslint:disable-next-line: typedef
  modificarSubRubro(subRubro: SubRubro) {
    this.toUpdateSubRubro = subRubro;
    this.consulting = false;
    this.openDialog();
  }

  // tslint:disable-next-line:typedef
  consultarSubRubro(subRubro: SubRubro) {
    this.toUpdateSubRubro = subRubro;
    this.consulting = true;
    this.openDialog();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '500px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      newSubRubro: this.toUpdateSubRubro,
      consulting: this.consulting
    };
    const modalDialog = this.matDialog.open(AgregarSubRubroComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.subRubroService.listarSubRubrosTodos().subscribe(data => {
        this.subRubros = data.data;
        this.subRubrosFilter = data.data;
      });
    });
  }

  // tslint:disable-next-line: typedef
  showModal(subRubro: SubRubro) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: '¿Desea cambiar estado?',
      title: 'Cambio estado',
      state: subRubro.habilitacion
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        this.subRubroService.cambiarHabilitacion(subRubro.id).subscribe(result => {
          this.getData();
        });
      } else {
        this.getData();
      }
    });
  }

  // tslint:disable-next-line: typedef
  getData() {
    this.subRubroService.listarSubRubrosTodos().subscribe(data => {
      this.subRubros = data.data;
      this.subRubrosFilter = data.data;
    });
  }

  // tslint:disable-next-line: typedef
  filtrarSubRubro(event: any) {
    if (this.busqueda !== null) {
      this.subRubrosFilter = this.subRubros.filter(item => {
        if (item.nombre.toUpperCase().includes(this.busqueda.toUpperCase())) {
          return item;
        }
      });
    } else {
      this.subRubrosFilter = this.subRubros;
    }
  }

  // tslint:disable-next-line: typedef
  backPage() {
    window.history.back();
  }

  // tslint:disable-next-line: typedef
  exportarPDF() {
    this.serviceReport.getReporteSubRubroPdf().subscribe(resp => {
      this.servicePdf.createAndDownloadBlobFile(this.servicePdf.base64ToArrayBuffer(resp.data.file), resp.data.name);
    });
  }

  // tslint:disable-next-line: typedef
  exportarExcel() {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.subRubrosFilter.length; index++) {
      this.subRubroExcel = new SubRubroExcel('', '', '');
      if (this.subRubrosFilter[index] != null) {
        this.subRubroExcel.nombre = this.subRubrosFilter[index].nombre;
        this.subRubroExcel.descripcion = this.subRubrosFilter[index].descripcion;
        this.subRubroExcel.nombreRubro = this.subRubrosFilter[index].rubroId.nombre;
      }
      this.subRubrosExcel.push(this.subRubroExcel);

    }
    this.excelService.exportToExcel(this.subRubrosExcel, 'Reporte SubRubros');

  }

}
