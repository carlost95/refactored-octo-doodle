import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DireccionesService} from "../../../service/direcciones.service";
import {Direccion} from "../../../modelo/Direccion";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AgregarArticuloComponent} from "../../../compras/agregar-articulo/agregar-articulo.component";
import {AgregarDireccionComponent} from "./agregar-direccion/agregar-direccion.component";
import {toNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {SnackConfirmComponent} from "../../../shared/snack-confirm/snack-confirm.component";
import {MatSnackBar} from "@angular/material/snack-bar";

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
      console.error(resp);
    });
  }

  backPage() {
    window.history.back();
  }

  newDireccion() {
    this.toUpdate = null;
    this.openDialog();
  }

  newEdit(direccion: Direccion) {
    this.toUpdate = direccion;
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
      if(result){
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

  showModal(cliente: any) {

  }
}
