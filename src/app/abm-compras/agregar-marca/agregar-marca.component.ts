import { AbmComprasService } from './../../service/abm-compras.service';
import { Marca } from './../../modelo/Marca';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-marca',
  templateUrl: './agregar-marca.component.html',
  styleUrls: ['./agregar-marca.component.css']
})
export class AgregarMarcaComponent implements OnInit {
  marca: Marca = new Marca();

  constructor(private serviceAbmCompra: AbmComprasService) { }

  ngOnInit() {
  }
  guardarMarca(marca: Marca) {
    console.log(marca);

    // this.marca.id = null;
    this.marca.nombre = this.marca.nombre.toUpperCase();
    this.marca.abreviatura = this.marca.abreviatura.toUpperCase();


    this.serviceAbmCompra.guardarMarca(this.marca).subscribe(data => {
      this.marca = data;
      alert("se guardo una nueva marca");
      window.history.back();
    });
  }
  cancelar() {
    window.history.back();
  }

}
