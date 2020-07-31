import { Banco } from "./../../modelo/Banco";
import { AbmComprasService } from "./../../service/abm-compras.service";
import { Router } from "@angular/router";
import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: "app-agregar-banco",
  templateUrl: "./agregar-banco.component.html",
  styleUrls: ["./agregar-banco.component.css"]
})
export class AgregarBancoComponent implements OnInit {
  banco: Banco = new Banco();

  constructor ( private service: AbmComprasService,
                public dialogRef: MatDialogRef<AgregarBancoComponent>,
                @Inject(MAT_DIALOG_DATA) public data: Banco) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {}

  guardarBanco(banco: Banco) {
    console.log(banco);

    this.banco.habilitado = null;
    this.banco.id = null;
    this.banco.nombre = this.banco.nombre.toUpperCase();
    this.banco.abreviatura = this.banco.abreviatura.toUpperCase();

    this.service.guardarBanco(this.banco).subscribe(data => {
      this.banco = data;
      alert("se guardo un nuevo banco");
      window.history.back();
      this.dialogRef.close();

    });
  }
  cancelar() {
    window.history.back();
  }
}
