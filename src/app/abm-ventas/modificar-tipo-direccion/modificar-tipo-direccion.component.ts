import { TipoDireccion } from '../../modelo/tipoDireccion';
import { ActivatedRoute } from '@angular/router';
import { VentasService } from 'src/app/service/ventas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modificar-tipo-direccion',
  templateUrl: './modificar-tipo-direccion.component.html',
  styleUrls: ['./modificar-tipo-direccion.component.css']
})
export class ModificarTipoDireccionComponent implements OnInit {
  tipoDireccion: TipoDireccion= new TipoDireccion();

  constructor(private service: VentasService, private id: ActivatedRoute ) { }

  ngOnInit() {
    let id: number;
    this.id.params.subscribe(data => (id = data["id"]));
    console.log("se muestra -->" + id);
    this.service.listarTipoDireccionId(id).subscribe(data => {
      this.tipoDireccion = data.data;
    });
  }

  actualizarTipoDireccion(tipoDireccion: TipoDireccion) {
    this.service.actualizarTipoDireccion(tipoDireccion).subscribe(data => {
      this.tipoDireccion = data;
      alert("se actualizo con EXITO");
      window.history.back();
    });
  }
  cancelar() {
    window.history.back();
  }

}
