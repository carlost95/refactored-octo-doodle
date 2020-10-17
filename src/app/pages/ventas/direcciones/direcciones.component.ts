import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DireccionesService} from "../../../service/direcciones.service";
import {Direccion} from "../../../modelo/Direccion";

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.scss']
})
export class DireccionesComponent implements OnInit {

  direcciones: Direccion [];
  idClient: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private direccionService: DireccionesService
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.idClient = p['id'];
      this.direccionService.getByClientId(this.idClient).subscribe(resp => {
        this.direcciones = resp.data;
        console.error(resp);
      })
    })
  }

  backPage() {
    window.history.back();
  }

  newDireccion() {
    this.router.navigate([`/ventas/agregar-direccion/1`])
  }

  showModal(cliente: any) {

  }
}
