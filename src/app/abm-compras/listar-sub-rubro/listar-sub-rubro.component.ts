import { SubRubroDTO } from './../../modelo/SubRubroDTO';
import { SubRubro } from './../../modelo/SubRubro';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ServiceReportService } from '../../service/service-report.service';
import { PdfExportService } from '../../service/pdf-export.service';
import { ExcelExportService } from '../../service/excel-export.service';
import { AgregarSubRubroComponent } from '../agregar-sub-rubro/agregar-sub-rubro.component';
import { SubRubroService } from '../../service/sub-rubro.service';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-listar-sub-rubro',
  templateUrl: './listar-sub-rubro.component.html',
  styleUrls: ['./listar-sub-rubro.component.css']
})
export class ListarSubRubroComponent implements OnInit {
  subRubro: SubRubro = null;
  subRubros: SubRubro[] = null;
  subRubrosFilter: SubRubro[] = null;
  nombreRubros: string[] = null;
  busquedaNombre: string = null;
  busqueda: string = null;
  toUpdateSubRubro: SubRubro;
  toUpdateSubRubroDTO: SubRubroDTO;

  constructor(
    private subRubroService: SubRubroService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService,
    private excelService: ExcelExportService,
    public matDialog: MatDialog

  ) { }

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
  modificarSubRubro(subRubro: SubRubro) {
    this.toUpdateSubRubro = subRubro;
    this.openDialog();
    // this.router.navigate(["abm-compras/modificar-sub-rubro/" + subRubro.id]);

  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '550px';
    dialogConfig.width = '350px';
    dialogConfig.data = this.toUpdateSubRubro;
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
        })
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
  exportarPDF() { }
  // tslint:disable-next-line: typedef
  exportarExcel() { }

  // tslint:disable-next-line: typedef
  newSubRubro() {
    this.toUpdateSubRubro = null;
    this.openDialog();
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
}
