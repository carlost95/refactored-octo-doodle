import { VentasService } from "./../../service/ventas.service";
import { Cliente } from "./../../modelo/Cliente";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-agregar-cliente",
  templateUrl: "./agregar-cliente.component.html",
  styleUrls: ["./agregar-cliente.component.css"],
})
export class AgregarClienteComponent implements OnInit {
  cliente: Cliente = new Cliente();
  response: Response;

  constructor(private service: VentasService) {}

  ngOnInit() {}
  guardarCliente(cliente: Cliente) {
    console.log(cliente);
    this.cliente.habilitacion = 1;
    this.cliente.id = null;

    this.cliente.nombre = this.cliente.nombre.toUpperCase();
    this.cliente.apellido = this.cliente.apellido.toUpperCase();

    this.service.guardarCliente(this.cliente).subscribe((data) => {
      this.cliente = data;
      alert("se guardo un nuevo cliente");
      window.history.back();
    });
  }
  cancelar() {
    window.history.back();
  }
}
