import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AbmComprasService } from './../../service/abm-compras.service';
import { UnidadMedida } from './../../modelo/UnidadMedida';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modificar-unidad-medida',
  templateUrl: './modificar-unidad-medida.component.html',
  styleUrls: ['./modificar-unidad-medida.component.css']
})
export class ModificarUnidadMedidaComponent implements OnInit {
  unidadMedida: UnidadMedida = new UnidadMedida;
  constructor(
    private serviceAbmCompra: AbmComprasService,
    private router: Router,
    private id: ActivatedRoute
  ) {}

  ngOnInit() {
    let id: number;
    this.id.params.subscribe(data => (id = data["id"]));
    console.log("ID DE MARCA: " + id);
    this.serviceAbmCompra.listarUnidadMedidaId(id).subscribe(resp => {
      this.unidadMedida = resp.data;
    });
  }
  actualizarUnidadMedida(unidadMedida: UnidadMedida) {
    unidadMedida.nombre = unidadMedida.nombre.toUpperCase();
    unidadMedida.abreviatura = unidadMedida.abreviatura.toUpperCase();

    this.serviceAbmCompra.actualizarUnidadMedida(unidadMedida).subscribe(data => {
      this.unidadMedida = data;
      alert("SE ACTUALIZO UNIDAD DE MEDIDA--> " + unidadMedida.nombre);
      window.history.back();
    });
  }

  cancelar() {
    window.history.back();
  }
}
