import {Banco} from "../../modelo/Banco";
import {Router} from "@angular/router";
import {AbmComprasService} from "../../service/abm-compras.service";
import {Component, Inject, OnInit} from "@angular/core";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AgregarBancoComponent} from "../agregar-banco/agregar-banco.component";

@Component({
  selector: "app-listar-banco",
  templateUrl: "./listar-banco.component.html",
  styleUrls: ["./listar-banco.component.css"]
})
export class ListarBancoComponent implements OnInit {
  banco: Banco = null;
  bancos: Banco[] = null;
  bancoFilter: Banco[] = null;
  busquedaNombre: string = null;
  busqueda: string = null;
  displayedColumns: string[] = ['nombre', 'abreviatura'];

  constructor(private service: AbmComprasService, private router: Router,
              public matDialog: MatDialog) {
  }

  ngOnInit() {
    this.service.listarBancosTodos().subscribe(data => {
      this.bancos = data.data;
      this.bancoFilter = data.data;
    });
  }

  modificarBanco(banco: Banco) {
    this.router.navigate(["abm-compras/modificar-banco/" + banco.id]);
  }

  deshabilitarBanco(banco: Banco) {
  }

  filtrarBancoNombre(event: any) {
    if (this.busqueda !== null) {
      this.bancoFilter = this.bancos.filter(item => {
        if (item.nombre.toUpperCase().includes(this.busqueda.toUpperCase())) {
          return item;
        }
      });
    } else {
      this.bancoFilter = this.bancos;
    }
  }

  filtrarBancoAbreviatura(event: any) {
    if (this.busquedaNombre !== null) {
      this.bancoFilter = this.bancos.filter(item => {
        if (
          item.abreviatura
            .toUpperCase()
            .includes(this.busquedaNombre.toUpperCase())
        ) {
          return item;
        }
      });
    } else {
      this.bancoFilter = this.bancos;
    }
  }

  newBanco(customContent) {

    this.openDialog(customContent);
  }

  openDialog(customContent): void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = '400px'
    dialogConfig.width = '300px';
    const modalDialog = this.matDialog.open(AgregarBancoComponent, dialogConfig);

  }

  backPage() {

  }
}
