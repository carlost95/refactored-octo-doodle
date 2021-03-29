import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {SnackConfirmComponent} from '../../../shared/snack-confirm/snack-confirm.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AgregarVentaComponent} from '../agregar-venta/agregar-venta.component';

@Component({
  selector: 'app-listar-venta',
  templateUrl: './listar-venta.component.html',
  styleUrls: ['./listar-venta.component.scss']
})
export class ListarVentaComponent implements OnInit {
  busqueda: string;
  ventas: null;
  ventasFilter: any;
  toUpdate: boolean;
  consulting: boolean;

  constructor(private router: Router,
              private snackBar: MatSnackBar,
              public matDialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  nuevaVenta(): void {
    this.toUpdate = null;
    this.consulting = false;
    this.openDialog();
  }

  filtrarVenta(): void {

  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '90%';
    dialogConfig.width = '90%';
    dialogConfig.data = {
      cliente: this.toUpdate,
      consulting: this.consulting
    };
    const modalDialog = this.matDialog.open(AgregarVentaComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar();
      }
      this.getData();
    });
  }

  getData(): void {
    // this.service.getAll().subscribe((data) => {
    //   this.clientes = data.data;
    //   this.clientesFilter = data.data;
    // });
  }

  backPage(): void {
    this.router.navigate(['venta']);
  }

  consultVenta(venta: any): void {

  }

  openSnackBar(): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
    });
  }
}
