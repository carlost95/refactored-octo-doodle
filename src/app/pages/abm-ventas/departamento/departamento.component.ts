import {Component, OnInit} from '@angular/core';
import {DepartamentosService} from "../../../service/departamentos.service";
import {Departamento} from "../../../models/Departamento";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AgregarClienteComponent} from "../../ventas/clientes/agregar-cliente/agregar-cliente.component";
import {AgregarDepartamentoComponent} from "../agregar-departamento/agregar-departamento.component";
import {SnackConfirmComponent} from "../../../shared/snack-confirm/snack-confirm.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Cliente} from "../../../models/Cliente";
import {ConfirmModalComponent} from "../../../shared/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {

  departamentos: Departamento[];
  private update: Departamento;
  private consulting: boolean = false;

  constructor(
    private departamentoService: DepartamentosService,
    public matDialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.departamentoService.getAll().subscribe(resp => {
      this.departamentos = resp.data;
      console.log(resp.data)
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
      state: departamento.estado
    };
    const modalDialog = this.matDialog.open(ConfirmModalComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(result => {
      if (result.state) {
        this.departamentoService.changeStatus(departamento.id).subscribe(result => {
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

  consultar(departamento: Departamento) {
    this.consulting = true;
    this.update = departamento;
    this.openDialog()
  }

  editar(departamento: Departamento) {
    this.consulting = false;
    this.update = departamento;
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
      departamentos: this.departamentos,
      departamento: this.update,
      consulting: this.consulting
    };
    const modalDialog = this.matDialog.open(AgregarDepartamentoComponent, dialogConfig);
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
