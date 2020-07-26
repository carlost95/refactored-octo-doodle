import { Cliente } from "./../../modelo/Cliente";
import { ActivatedRoute } from "@angular/router";
import { VentasService } from "./../../service/ventas.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-modificar-clientes",
  templateUrl: "./modificar-clientes.component.html",
  styleUrls: ["./modificar-clientes.component.css"]
})
export class ModificarClientesComponent implements OnInit {
  cliente: Cliente = new Cliente();

  constructor(private service: VentasService, private id: ActivatedRoute) {}

  ngOnInit() {
    let id: number;
    this.id.params.subscribe(data => (id = data["id"]));
    console.log("se muestra -->" + id);
    this.service.listarClienteId(id).subscribe(data => {
      this.cliente = data.data;
    });
  }
  actualizarCliente(cliente: Cliente) {
    this.service.actualizarCliente(cliente).subscribe(data => {
      this.cliente = data;
      alert("se actualizo con EXITO");
      window.history.back();
    });
  }
  cancelar() {
    window.history.back();
  }
}
