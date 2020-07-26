import { SubRubroDTO } from './../../modelo/SubRubroDTO';
import { Router } from '@angular/router';
import { Rubro } from './../../modelo/Rubro';
import { SubRubro } from './../../modelo/SubRubro';
import { Component, OnInit } from '@angular/core';
import { AbmComprasService } from 'src/app/service/abm-compras.service';

@Component({
  selector: 'app-agregar-sub-rubro',
  templateUrl: './agregar-sub-rubro.component.html',
  styleUrls: ['./agregar-sub-rubro.component.css']
})
export class AgregarSubRubroComponent implements OnInit {
  subRubroDTO: SubRubroDTO = new SubRubroDTO();
  rubros: Rubro[] = null;
  rubroFilter: Rubro[] = null;
  idRubro: number = 1;
  nombreRubro: string = null;

  constructor(private serviceAbmCompra: AbmComprasService, private router: Router) {}

  ngOnInit() {
    this.serviceAbmCompra.listarRubrosTodos().subscribe(data => {
      this.rubros = Object.keys(data.data).map(function(key) {
        return data.data[key];
      });
      this.rubroFilter = this.rubros;
    });
  }
  volverAtras() {
    window.history.back();
  }
  nuevoSubRubro(subRubroDTO: SubRubroDTO) {
    this.subRubroDTO.rubroId = 1;

    this.rubros.forEach(rubro => {
      if (rubro.nombre == this.nombreRubro) {
        this.subRubroDTO.id = rubro.id;
      }
    });

    for (var i = 0; i < this.rubros.length; i++) {
      if (this.rubros[i].nombre == this.nombreRubro) {
        this.subRubroDTO.rubroId = this.rubros[i].id;
      }
    }
    this.subRubroDTO.habilitacion = 1;
    this.subRubroDTO.id = null;
    this.subRubroDTO.nombre=this.subRubroDTO.nombre.toUpperCase();
    this.subRubroDTO.descripcion=this.subRubroDTO.descripcion.toUpperCase();

    this.serviceAbmCompra.guardarSubRubro(this.subRubroDTO).subscribe(data => {
      alert("SE GUARDO UN NUEVO SUB RUBRO");
      window.history.back();
    });
  }

  listarRubros(filterVal: any) {
    if (filterVal == "0") this.rubroFilter = this.rubros;
    else
      this.rubroFilter = this.rubros.filter(
        item => item.nombre == filterVal
      );
  }
}
