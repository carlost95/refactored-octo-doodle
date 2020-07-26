import { Banco } from "../../modelo/Banco";
import { Router } from "@angular/router";
import { AbmComprasService } from "../../service/abm-compras.service";
import { Component, OnInit } from "@angular/core";

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

  constructor(private service: AbmComprasService, private router: Router) {}

  ngOnInit() {
    this.service.listarBancosTodos().subscribe(data => {
      this.bancos = data.data;
      this.bancoFilter = data.data;
    });
  }
  modificarBanco(banco: Banco) {
    this.router.navigate(["abm-compras/modificar-banco/" + banco.id]);
  }
  deshabilitarBanco(banco: Banco) {}
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
  backPage() {
    window.history.back();
  }
}
