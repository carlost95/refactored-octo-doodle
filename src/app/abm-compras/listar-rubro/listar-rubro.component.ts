import { Router } from '@angular/router';
import { AbmComprasService } from './../../service/abm-compras.service';
import { Rubro } from './../../modelo/Rubro';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-rubro',
  templateUrl: './listar-rubro.component.html',
  styleUrls: ['./listar-rubro.component.css']
})
export class ListarRubroComponent implements OnInit {
  rubro: Rubro = null;
  rubros: Rubro[] = null;
  rubrosFilter: Rubro[] = null;
  busquedaNombre: string = null;
  busqueda: string = null;

  constructor(
    private serviceAbmCompra: AbmComprasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.serviceAbmCompra.listarRubrosTodos().subscribe(data => {
      this.rubros = data.data;
      this.rubrosFilter = data.data;
    });
  }
  modificarRubros(rubro: Rubro) {
    this.router.navigate(["abm-compras/modificar-rubro/" + rubro.id]);
  }
  deshabilitarRubro(rubro: Rubro) {
    let resultado: boolean;
    resultado = confirm("¿DESEA DESHABILITAR ESTE RUBRO?");
    if (resultado === true) {
      this.serviceAbmCompra
        .desabilitarRubro(rubro.id)
        .subscribe(data => {
          window.location.reload();
        });
    }
  }
  filtrarRubroNombre(event: any) {
    if (this.busqueda !== null) {
      this.rubrosFilter = this.rubros.filter(item => {
        if (item.nombre.toUpperCase().includes(this.busqueda.toUpperCase())) {
          return item;
        }
      });
    } else {
      this.rubrosFilter = this.rubros;
    }
  }

  backPage() {
    window.history.back();
  }
}
