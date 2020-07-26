import { AbmComprasService } from './../../service/abm-compras.service';
import { Rubro } from './../../modelo/Rubro';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-rubro',
  templateUrl: './agregar-rubro.component.html',
  styleUrls: ['./agregar-rubro.component.css']
})
export class AgregarRubroComponent implements OnInit {
  rubro: Rubro = new Rubro();
  constructor(private service: AbmComprasService) {}

  ngOnInit() {}

  guardarRubro(rubro: Rubro) {

    this.rubro.habilitacion = null;
    this.rubro.id = null;
    this.rubro.nombre = this.rubro.nombre.toUpperCase();
    this.rubro.descripcion = this.rubro.descripcion.toUpperCase();

    this.service.guardarRubro(this.rubro).subscribe(data => {
      this.rubro = data;
      alert("SE AGREGO UN NUEVO RUBRO");
      window.history.back();
    });
  }
  cancelar() {
    window.history.back();
  }
}
