import {SubRubro} from '../../../models/SubRubro';
import {Component, OnInit} from '@angular/core';
import {MatDialogConfig, MatDialog} from '@angular/material/dialog';
import {ServiceReportService} from '../../../service/service-report.service';
import {PdfExportService} from '../../../service/pdf-export.service';
import {ExcelExportService} from '../../../service/excel-export.service';
import {AgregarSubRubroComponent} from '../agregar-sub-rubro/agregar-sub-rubro.component';
import {SubRubroService} from '../../../service/sub-rubro.service';
import {ConfirmModalComponent} from '../../../shared/confirm-modal/confirm-modal.component';
import {SubRubroExcel} from '../../../models/SubRubroExcel';
import {Router} from '@angular/router';
import {TokenService} from '../../../service/token.service';
import {SnackConfirmComponent} from '../../../shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  consulting = false;

  isLogged = false;
  roles: string[];
  isAdmin = false;
  isGerente = false;

  constructor(
    private subRubroService: SubRubroService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService,
    private excelService: ExcelExportService,
    public matDialog: MatDialog,
    private router: Router,
    private tokenService: TokenService,
    private snackBar: MatSnackBar) {
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
    this.subRubroService.listarSubRubrosTodos().subscribe(data => {
      this.subRubros = data.data;
      this.subRubrosFilter = data.data;
    });


  }

  newSubRubro(): void {
    this.toUpdateSubRubro = null;
    this.consulting = false;
    this.openDialog();
  }

  modificarSubRubro(subRubro: SubRubro): void {
    this.toUpdateSubRubro = subRubro;
    this.consulting = false;
    this.openDialog();
  }

  consultarSubRubro(subRubro: SubRubro): void {
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
      if (result) {
        this.openSnackBar(result);
      }
      this.getData();
    });
  }

  showModal(subRubro: SubRubro): void {
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

  getData(): void {
    this.subRubroService.listarSubRubrosTodos().subscribe(data => {
      this.subRubros = data.data;
      this.subRubrosFilter = data.data;
    });
  }

  filtrarSubRubro(event: any): void {
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

  backPage(): void {
    this.router.navigate(['abm-compras']);
  }

  exportarPDF(): void {
    this.serviceReport.getReporteSubRubroPdf().subscribe(resp => {
      this.servicePdf.createAndDownloadBlobFile(this.servicePdf.base64ToArrayBuffer(resp.data.file), resp.data.name);
    });
  }

  exportarExcel(): void {
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

  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }

}
