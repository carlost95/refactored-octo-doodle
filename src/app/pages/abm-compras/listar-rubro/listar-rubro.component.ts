import {Rubro} from '../../../models/Rubro';
import {Component, OnInit} from '@angular/core';
import {RubrosService} from '../../../service/rubros.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../../../shared/confirm-modal/confirm-modal.component';
import {AgregarRubroComponent} from '../agregar-rubro/agregar-rubro.component';
import {ServiceReportService} from '../../../service/service-report.service';
import {PdfExportService} from '../../../service/pdf-export.service';
import {ExcelExportService} from '../../../service/excel-export.service';
import {RubroExcel} from '../../../models/RubroExcel';
import {TokenService} from '../../../service/token.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-listar-rubro',
  templateUrl: './listar-rubro.component.html',
  styleUrls: ['./listar-rubro.component.css']
})
export class ListarRubroComponent implements OnInit {
  rubro: Rubro = null;
  rubros: Rubro[] = null;
  rubrosFilter: Rubro[] = null;
  consulting: boolean;
  busqueda: string = null;
  toUpdateRubro: Rubro;
  rubroExcel: RubroExcel;
  rubrosExcel: RubroExcel[] = [];

  isLogged = false;
  roles: string[];
  isAdmin = false;
  isGerente = false;

  constructor(
    private router: Router,
    private serviceRubro: RubrosService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService,
    private excelService: ExcelExportService,
    public matDialog: MatDialog,
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
    this.serviceRubro.listarRubrosTodos().subscribe(data => {
      this.rubros = data.data;
      this.rubrosFilter = this.rubros;
    });
  }

  filtrarRubro(event: any): void {
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

  backPage(): void {
    this.router.navigate(['abm-compras']);
  }

  newRubro(): void {
    this.toUpdateRubro = null;
    this.consulting = false;
    this.openDialog();
  }

  modificarRubro(rubro: Rubro): void {
    this.toUpdateRubro = rubro;
    this.consulting = false;
    this.openDialog();

  }

  consultarRubro(rubro: Rubro): void {
    this.toUpdateRubro = rubro;
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
      newRubro: this.toUpdateRubro,
      consulting: this.consulting
    };
    const modalDialog = this.matDialog.open(AgregarRubroComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.serviceRubro.listarRubrosTodos().subscribe(data => {
        this.rubros = data.data;
        this.rubrosFilter = data.data;
      });
    });
  }

  showModal(rubro: Rubro): void {
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
        });
      } else {
        this.getData();
      }
    });
  }

  getData(): void {
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

  exportarPDF(): void {
    this.serviceReport.getReporteRubroPdf().subscribe(resp => {
      this.servicePdf.createAndDownloadBlobFile(this.servicePdf.base64ToArrayBuffer(resp.data.file), resp.data.name);
    });
  }
}
