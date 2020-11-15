import {Component, OnInit} from '@angular/core';
import {UnidadMedidaService} from '../../../service/unidad-medida.service';
import {ServiceReportService} from '../../../service/service-report.service';
import {PdfExportService} from '../../../service/pdf-export.service';
import {ExcelExportService} from '../../../service/excel-export.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AgregarUnidadMedidaComponent} from '../agregar-unidad-medida/agregar-unidad-medida.component';
import {UnidadMedida} from '../../../models/UnidadMedida';
import {ConfirmModalComponent} from '../../../shared/confirm-modal/confirm-modal.component';
import {UnidadMedidaExcel} from '../../../models/UnidadMedidaExcel';
import {TokenService} from '../../../service/token.service';
import {Router} from '@angular/router';
import {SnackConfirmComponent} from '../../../shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-unidad-medida',
  templateUrl: './listar-unidad-medida.component.html',
  styleUrls: ['./listar-unidad-medida.component.css']
})
export class ListarUnidadMedidaComponent implements OnInit {

  unidadMedidas: UnidadMedida[] = null;
  unidadMedidaFilter: UnidadMedida[] = null;
  busqueda: string = null;
  toUpdateUnidadMedida: UnidadMedida;
  unidadMedidaExcel: UnidadMedidaExcel;
  unidadMedidasExcel: UnidadMedidaExcel[] = [];
  consulting = false;

  isLogged = false;
  roles: string[];
  isAdmin = false;
  isGerente = false;

  constructor(
    private unidadMedidaService: UnidadMedidaService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService,
    private excelService: ExcelExportService,
    public matDialog: MatDialog,
    private tokenService: TokenService,
    private router: Router,
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
    this.unidadMedidaService.listarUnidadMedidaTodos().subscribe(data => {
      this.unidadMedidas = data.data;
      this.unidadMedidaFilter = data.data;
    });
  }

  newUnidadMedida(): void {
    this.toUpdateUnidadMedida = null;
    this.consulting = false;
    this.openDialog();
  }

  modificarUnidadMedida(unidadMedida: UnidadMedida): void {
    this.toUpdateUnidadMedida = unidadMedida;
    this.consulting = false;
    this.openDialog();
  }

  consultarUnidadMedida(unidadMedida: UnidadMedida): void {
    this.toUpdateUnidadMedida = unidadMedida;
    this.consulting = true;
    this.openDialog();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = {
      unidMed: this.toUpdateUnidadMedida,
      consulting: this.consulting
    };
    const modalDialog = this.matDialog.open(AgregarUnidadMedidaComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.unidadMedidaService.listarUnidadMedidaTodos().subscribe(data => {
        this.unidadMedidas = data.data;
        this.unidadMedidaFilter = data.data;
      });
      if (result) {
        this.openSnackBar(result);
      }
      this.getData();
    });
  }

  showModal(unidadMedida: UnidadMedida): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: 'Desea cambiar estado?',
      title: 'Cambio estado',
      state: unidadMedida.habilitacion
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        this.unidadMedidaService.cambiarHabilitacion(unidadMedida.id).subscribe(result => {
          this.getData();
        });
      } else {
        this.getData();
      }
    });
  }

  getData(): void {
    this.unidadMedidaService.listarUnidadMedidaTodos().subscribe(data => {
      this.unidadMedidas = data.data;
      this.unidadMedidaFilter = data.data;
    });
  }

  backPage(): void {
    this.router.navigate(['abm-compras']);
  }

  filtarUnidadMedida(event: any): void {
    this.busqueda = this.busqueda.toLowerCase();
    this.unidadMedidaFilter = this.unidadMedidas;
    if (this.busqueda !== null) {
      this.unidadMedidaFilter = this.unidadMedidas.filter(item => {
        const nombre = item.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
        const abreviatura = item.abreviatura.toLowerCase().indexOf(this.busqueda) !== -1;
        return nombre || abreviatura;
      });
    }
  }

  exportarPDF(): void {
    this.serviceReport.getReporteUnidadMedidaPdf().subscribe(resp => {
      this.servicePdf.createAndDownloadBlobFile(this.servicePdf.base64ToArrayBuffer(resp.data.file), resp.data.name);
    });
  }

  exportarExcel(): void {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.unidadMedidaFilter.length; index++) {
      this.unidadMedidaExcel = new UnidadMedidaExcel(0, '', '');
      if (this.unidadMedidaFilter[index] != null) {
        this.unidadMedidaExcel.id = this.unidadMedidaFilter[index].id;
        this.unidadMedidaExcel.nombre = this.unidadMedidaFilter[index].nombre;
        this.unidadMedidaExcel.abreviatura = this.unidadMedidaFilter[index].abreviatura;
      }
      this.unidadMedidasExcel.push(this.unidadMedidaExcel);
    }
    this.excelService.exportToExcel(this.unidadMedidasExcel, 'Reporte Unidades Medida');
  }

  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
}
