import { Component, OnInit } from '@angular/core';
import {Departamento} from "../../../models/Departamento";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmModalComponent} from "../../../shared/confirm-modal/confirm-modal.component";
import {SnackConfirmComponent} from "../../../shared/snack-confirm/snack-confirm.component";
import {Distrito} from "../../../models/Distrito";
import {DistritoService} from "../../../service/distrito.service";
import {AgregarDistritoComponent} from "./agregar-distrito/agregar-distrito.component";

@Component({
  selector: 'app-distrito',
  templateUrl: './distrito.component.html',
  styleUrls: ['./distrito.component.scss']
})
export class DistritoComponent implements OnInit {

  distritos: Distrito[];
  private update: Distrito;
  private consulting: boolean = false;

  constructor(
    private distritoService: DistritoService,
    public matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.distritoService.getDistritos().subscribe(resp => {
      this.distritos = resp.data;
    });
  }

  showModal(departamento: Departamento) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = '300px';
    dialogConfig.width = '350px';
    dialogConfig.data = {
      message: 'Desea cambiar estado?',
      title: 'Cambio estado',
      state: true
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        this.distritoService.changeStatus(departamento.id).subscribe(result => {
          this.getData();
        })
      } else {
        this.getData();
      }
    });
  }

  nuevo() {
    this.consulting = false;
    this.update = undefined;
    this.openDialog()

  }

  consultar(distrito: Distrito) {
    this.consulting = true;
    this.update = distrito;
    this.openDialog()
  }

  editar(distrito: Distrito) {
    this.consulting = false;
    this.update = distrito;
    this.openDialog()
  }

  volver() {
    window.history.back()
  }


  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = {
      distritos: this.distritos,
      distrito: this.update,
      consulting: this.consulting
    };
    const modalDialog = this.matDialog.open(AgregarDistritoComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar(result);
      }
      this.getData();
    })
  }

  openSnackBar(msg: string) {
    this._snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg
    });
  }
}
