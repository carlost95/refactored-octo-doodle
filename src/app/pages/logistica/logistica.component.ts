import { Component, OnInit } from '@angular/core';
import { MapService, PlaceService } from '../../service';
import { LogisticaService } from '../../service/logistica.service';
import { Router } from '@angular/router';
import { UserLocation } from '../../models/UserLocation';
import { SnackConfirmComponent } from '../../shared/snack-confirm/snack-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logistica',
  templateUrl: './logistica.component.html',
  styleUrls: ['./logistica.component.css']
})
export class LogisticaComponent implements OnInit {

  paradas: any[] = [];
  private paradasAVisitar: any[] = [];
  userLocation: UserLocation = new UserLocation;

  constructor(private placeService: PlaceService,
    private logisticaService: LogisticaService,
    private mapService: MapService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit() {
    this.getInicialMap();
    await this.placeService.getUserLocation().then(data => {
      this.userLocation.longitud = data[0],
        this.userLocation.latitud = data[1];
    }
    )
  }
  getInicialMap() {
    this.logisticaService.getParadas().subscribe(paradas => this.paradas = paradas);
  }

  get isUserLocationReady(): boolean {
    return this.placeService.isUserLocationReady;
  }

  agregarParada(parada: any): void {
    this.paradasAVisitar.push(parada);
    this.mapService.flyTo([parada.longitud, parada.latitud]);
    this.mapService.updateMarker([parada.longitud, parada.latitud], '#ffc107');
  }

  trazarRuta() {
    if (this.paradasAVisitar.length === 1) {
      this.openSnackBar("se debe cargar como minimo 2 ubicaciones para poder trazar la ruta")
      return;
    }
    const mapa = new Map(this.paradasAVisitar.map((object, index) => {
      return [index, object];
    }));
    const paradas = this.paradasAVisitar.map((parada, index) => ({ ...parada, numero: index }));
    this.logisticaService.getDistancesFromMapbox(paradas).subscribe(result => {
      const distancias = { distancia: result.distances };
      this.logisticaService.obtenerRutaYDistanciaRecorrida(distancias).subscribe(({ parada, distancia }) => {
        const ruta = parada.map(p => mapa.get(p));
        const rutas = this.cargarDataEmpresa(ruta);
        this.logisticaService.getRouteFromMapbox(rutas).subscribe(r => {
          this.mapService.drawRoute(r)
          this.mapService.updateMarkers(ruta.slice(0, -1))
        });
      });
    });
  }
  cargarDataEmpresa(rutas: any): any[] {
    const rutaComplete = [];
    rutaComplete.push(this.userLocation);
    for (let index = 0; index < rutas.length - 1; index++) {
      rutaComplete.push(rutas[index]);
    }
    rutaComplete.push(this.userLocation)
    return rutaComplete;
  }
  volverAtras(): void {
    this.router.navigate(['/']);
  }
  recargarDatos() {
    window.location.reload()
  }
  openSnackBar(msg: string): void {
    this.snackBar.openFromComponent(SnackConfirmComponent, {
      panelClass: ['error-snackbar'],
      duration: 5 * 1000,
      data: msg,
    });
  }
}
