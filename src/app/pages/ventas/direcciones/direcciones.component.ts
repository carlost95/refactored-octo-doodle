import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DireccionesService} from "../../../service/direcciones.service";
import {Direccion} from "../../../models/Direccion";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AgregarDireccionComponent} from "./agregar-direccion/agregar-direccion.component";
import {SnackConfirmComponent} from "../../../shared/snack-confirm/snack-confirm.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmModalComponent} from "../../../shared/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.scss']
})
export class DireccionesComponent implements OnInit {

  direcciones: Direccion [];
  idClient: number;
  toUpdate: Direccion;
  consulting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private direccionService: DireccionesService,
    public matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.idClient = p['id'];
      this.getDirecciones();
    })
  }

  getDirecciones() {
    this.direccionService.getByClientId(this.idClient).subscribe(resp => {
      this.direcciones = resp.data;
    });
  }

  backPage() {
    window.history.back();
  }

  newDireccion() {
    this.toUpdate = null;
    this.consulting = false;
    this.openDialog();
  }

  newEdit(direccion: Direccion) {
    this.toUpdate = direccion;
    this.consulting = false;
    this.openDialog();
  }

  consultar(direccion: Direccion) {
    this.toUpdate = direccion;
    this.consulting = true;
    this.openDialog();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.data = {
      direccion: this.toUpdate,
      consultar: this.consulting,
      cliente: this.idClient
    };
    const modalDialog = this.matDialog.open(AgregarDireccionComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      this.getDirecciones();
    });

    modalDialog.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar();
      }
    })
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
    });
  }

  showModal(direccion: Direccion) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: 'Desea cambiar estado?',
      title: 'Cambio estado',
      state: direccion.estado
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        this.direccionService.changeStatus(direccion).subscribe(result => {
          this.getDirecciones();
        })
      } else {
        this.getDirecciones();
      }
    });
  }
}
