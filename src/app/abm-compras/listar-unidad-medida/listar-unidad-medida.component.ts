import { Router } from '@angular/router';
import { AbmComprasService } from './../../service/abm-compras.service';
import { UnidadMedida } from './../../modelo/UnidadMedida';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-unidad-medida',
  templateUrl: './listar-unidad-medida.component.html',
  styleUrls: ['./listar-unidad-medida.component.css']
})
export class ListarUnidadMedidaComponent implements OnInit {

  unidadMedida: UnidadMedida = null;
  unidadMedidas: UnidadMedida[] = null;
  unidadMedidaFilter: UnidadMedida[] = null;
  busquedaNombre: string = null;
  busqueda: string = null;

  constructor(private serviceAbmCompra: AbmComprasService, private router: Router) {}

  ngOnInit() {
    this.serviceAbmCompra.listarUnidadMedidaTodos().subscribe(data => {
      console.log("prueba");

      this.unidadMedidas = data.data;
      this.unidadMedidaFilter = data.data;
    });
  }
  modificarUnidadMedida(unidadMedida: UnidadMedida) {
    this.router.navigate(["abm-compras/modificar-unidad-medida/" + unidadMedida.id]);
  }
  deshabilitarUnidadMedida(unidadMedida: UnidadMedida) {
    let resultado: boolean;
    resultado = confirm("¿DESEA DESHABILITAR ESTA MARCA?");
    if (resultado === true) {
      this.serviceAbmCompra
        .desabilitarUnidadMedida(unidadMedida.id)
        .subscribe(data => {
          window.location.reload();
        });
    }
  }
  filtrarBancoNombre(event: any) {
    if (this.busqueda !== null) {
      this.unidadMedidaFilter = this.unidadMedidas.filter(item => {
        if (item.nombre.toUpperCase().includes(this.busqueda.toUpperCase())) {
          return item;
        }
      });
    } else {
      this.unidadMedidaFilter = this.unidadMedidas;
    }
  }

  filtrarBancoAbreviatura(event: any) {
    if (this.busquedaNombre !== null) {
      this.unidadMedidaFilter = this.unidadMedidas.filter(item => {
        if (
          item.abreviatura
            .toUpperCase()
            .includes(this.busquedaNombre.toUpperCase())
        ) {
          return item;
        }
      });
    } else {
      this.unidadMedidaFilter = this.unidadMedidas;
    }
  }
  backPage() {
    window.history.back();
  }
}
