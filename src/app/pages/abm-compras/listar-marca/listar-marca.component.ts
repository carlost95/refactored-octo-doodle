import {Marca} from '../../../models/Marca';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ConfirmModalComponent} from '../../../shared/confirm-modal/confirm-modal.component';
import {Component, OnInit} from '@angular/core';
import {MarcasService} from '../../../service/marcas.service';
import {AgregarMarcaComponent} from '../agregar-marca/agregar-marca.component';
import {ServiceReportService} from '../../../service/service-report.service';
import {PdfExportService} from 'src/app/service/pdf-export.service';
import {ExcelExportService} from 'src/app/service/excel-export.service';
import {MarcaExcel} from '../../../models/MarcaExcel';
import {TokenService} from '../../../service/token.service';
import {SnackConfirmComponent} from '../../../shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-marca',
  templateUrl: './listar-marca.component.html',
  styleUrls: ['./listar-marca.component.css']
})
export class ListarMarcaComponent implements OnInit {
  marca: Marca = null;
  marcas: Marca[] = null;
  marcaFilter: Marca[] = null;
  busqueda: string = null;
  toUpdateMarca: Marca;
  consultingMark: boolean;
  marcaExcel: MarcaExcel;
  marcasExel: MarcaExcel[] = [];

  isLogged = false;
  roles: string[];
  isAdmin = false;
  isGerente = false;

  constructor(
    private serviceMarca: MarcasService,
    private router: Router,
    public matDialog: MatDialog,
    private excelService: ExcelExportService,
    private serviceReport: ServiceReportService,
    private servicePdf: PdfExportService,
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
    this.serviceMarca.listarMarcaTodos().subscribe(data => {
      this.marcas = data.data;
      this.marcaFilter = data.data;
    });
  }

  filtrar(event: any): void {
    this.busqueda = this.busqueda.toLowerCase();
    this.marcaFilter = this.marcas;
    if (this.busqueda !== null) {
      this.marcaFilter = this.marcas.filter(item => {
        const inName = item.nombre.toLowerCase().indexOf(this.busqueda) !== -1;
        const inLastName =
          item.abreviatura.toLowerCase().indexOf(this.busqueda) !== -1;
        return inName || inLastName;
      });
    }
  }

  exportarPDF(): void {
    this.serviceReport.getReporteMarcaPdf().subscribe(resp => {
      this.servicePdf.createAndDownloadBlobFile(this.servicePdf.base64ToArrayBuffer(resp.data.file), resp.data.name);
    });
  }

  exportarExcel(): void {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < this.marcaFilter.length; index++) {
      this.marcaExcel = new MarcaExcel(0, '', '');
      if (this.marcaFilter[index] != null) {
        this.marcaExcel.id = this.marcaFilter[index].id;
        this.marcaExcel.nombre = this.marcaFilter[index].nombre;
        this.marcaExcel.abreaviatura = this.marcaFilter[index].abreviatura;
      }
      this.marcasExel.push(this.marcaExcel);
    }
    this.excelService.exportToExcel(this.marcasExel, 'Reporte Marcas');
  }

  backPage(): void {
    this.router.navigate(['abm-compras']);
  }

  newMarca(): void {
    this.toUpdateMarca = null;
    this.consultingMark = false;
    this.openDialog();
  }

  modificarMarca(marca: Marca): void {
    this.toUpdateMarca = marca;
    this.consultingMark = false;
    this.openDialog();
  }

  consultarMarca(marca: Marca): void {
    this.toUpdateMarca = marca;
    this.consultingMark = true;
    this.openDialog();
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = {
      mark: this.toUpdateMarca,
      consulting: this.consultingMark
    };
    const modalDialog = this.matDialog.open(AgregarMarcaComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.serviceMarca.listarMarcaTodos().subscribe(data => {
        this.marcas = data.data;
        this.marcaFilter = data.data;
      });
      if (result) {
        this.openSnackBar(result);
      }
      this.getData();
    });
  }

  showModal(marca: Marca): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: 'Desea cambiar estado?',
      title: 'Cambio estado',
      state: marca.habilitacion
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        // tslint:disable-next-line:no-shadowed-variable
        this.serviceMarca.cambiarHabilitacion(marca.id).subscribe(result => {
          this.getData();
        });
      } else {
        this.getData();
      }
    });
  }

  getData(): void {
    this.serviceMarca.listarMarcaTodos().subscribe(data => {
      this.marcas = data.data;
      this.marcaFilter = data.data;
    });
  }

  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
}
