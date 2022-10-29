import { Injectable } from '@angular/core';
import {
  LngLatLike,
  Map,
  Marker,
} from 'mapbox-gl';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})

export class MapService {

  get isMapReady() {
    return !!this.map;
  }
  private map?: Map;
  private markers: Marker[] = [];
  any;
  setMarker(mark: Marker) {
    this.markers.push(mark);
  }

  setMap(map: Map) {
    this.map = map;
  }

  // TODO: Se define los parametros para inicializar mapa
  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) {
      throw new Error('El mapa no esta inicailizado');
    }
    this.map?.flyTo({
      zoom: 14,
      center: coords,
    });
  }

  addMarker(coord: any[]) {
    const mark = this.markers.find(marker => {
      console.log(marker.getLngLat());
      return marker.getLngLat().lng === Number(coord[0]) && marker.getLngLat().lat === Number(coord[1]);
    });
  }

  updateMarker(coord: any[], color: string, label?: string) {
    const mark = this.markers.find(marker => {
      return marker.getLngLat().lng === Number(coord[0]) && marker.getLngLat().lat === Number(coord[1]);
    });
    mark.remove();
    const marker = new Marker({ color, draggable: false })
      .setLngLat([coord[0], coord[1]]);
    const marks = this.markers.filter(markl => {
      return !(markl.getLngLat().lng === Number(coord[0]) && markl.getLngLat().lat === Number(coord[1]));
    });
    const result = new Array<any>(marker, marks);
    this.markers = _.flatten(result);
    marker.addTo(this.map);
  }

  updateMarkers(ruta: any[]): void {
    const coordenadas = ruta.map(({ latitud, longitud }) => ({ latitud, longitud }));
    const marcadoresAEliminar = this.markers.filter(marcador => this.marcadorCoincidenteConCoordenadas(marcador, coordenadas));
    const marcadoresAConservar = this.markers.filter(marcador => !this.marcadorCoincidenteConCoordenadas(marcador, coordenadas));
    marcadoresAEliminar.forEach(marcador => marcador.remove());
    const color = '#ffc107';
    const marcadoresACrear = coordenadas.map(({ latitud, longitud }) => {
      const nuevoMarcador = new Marker({ color, draggable: false });
      nuevoMarcador.setLngLat([longitud, latitud]);
      return nuevoMarcador;
    });
    const marcadoresLayer = _.flatten(new Array<any>(marcadoresACrear, marcadoresAConservar));

    marcadoresLayer.forEach(marcador => marcador.addTo(this.map));
    const features = this.configuracionDeLayerParaCoordenadas(marcadoresACrear);
    if (this.map.getLayer('points')) {
      this.map.removeLayer('points');
      this.map.removeSource('points')
    }
    this.map.addSource('points', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features
      }
    });
    this.map.addLayer({
      id: 'points',
      type: 'symbol',
      source: 'points',
      layout: {
        'text-field': ['get', 'title'],
        'text-font': [
          'Open Sans Semibold',
          'Arial Unicode MS Bold'
        ],
        'text-offset': [0, 1.25],
        'text-anchor': 'top'
      }
    });
  }

  marcadorCoincidenteConCoordenadas(marcador, coordenadas: any[]): any {
    const { lat, lng } = marcador.getLngLat()
    return coordenadas.find(coordenada => lng === Number(coordenada.longitud) && lat === Number(coordenada.latitud));
  }


  configuracionDeLayerParaCoordenadas(marcadores: any[]): any {
    const features = marcadores.map((marcador, index) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [marcador.getLngLat().lng, marcador.getLngLat().lat]
      },
      properties: {
        title: (`${index + 1}`),
      }
    }));
    return features;
  }

  drawRoute(ruta: any): void {
    const coordenadas = ruta.routes[0].geometry.coordinates;
    const waypoints = ruta.waypoints.map(w => w.location);
    const indices: number[] = waypoints.map(w => coordenadas.findIndex(c => w[0] === c[0] && w[1] === c[1]));
    const tramos = [];
    indices.reduce((acc, indice, i) => {
      if (i === indices.length - 1) {
        tramos.push(coordenadas.slice(acc));
      } else {
        tramos.push(coordenadas.slice(acc, indice));
        return indice;
      }
    });
    const geojson = this.configuracionDeTramos(tramos, coordenadas);

    if (this.map.getSource('route')) {
      this.map.getSource('route');
    } else {
      this.map.addSource('route', {
        type: 'geojson',
        data: geojson,
      });
      this.agregarLayerRuta();
      this.agregarLayerAuto(geojson);
    }
  }

  configuracionDeTramos(tramos: any[], coordenadas): any {
    const gradientes = [0, 5, 10, 15, 20, 30];

    const configuracion = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        properties: {
          gradient: gradientes[0]
        },
        geometry: {
          type: 'LineString',
          coordinates: coordenadas
        }
      }]
    };

    tramos.forEach((tramo, index) => {
      const gradient = gradientes[Number(index % gradientes.length)];
      configuracion.features.push({
        type: 'Feature',
        properties: {
          gradient
        },
        geometry: {
          type: 'LineString',
          coordinates: tramo
        }
      });
    });

    return configuracion;
  }

  agregarLayerRuta(): void {
    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'miter',
        'line-cap': 'butt'
      },
      paint: {
        'line-width': 3,
        'line-color': [
          'interpolate',
          ['linear'],
          ['get', 'gradient'],
          0,
          'hsl(241,80%,64%)',
          5,
          'hsl(124,59%,41%)',
          10,
          'hsl(0, 100%, 65%)',
          15,
          'hsl(197,82%,32%)',
          20,
          'hsl(34,100%,51%)',
          30,
          'hsl(284,51%,63%)'
        ]
      }
    });
  }

  agregarLayerAuto(data): void {
    this.map.addLayer({
      id: 'directions',
      type: 'symbol',
      source: {
        type: 'geojson',
        data
      },
      paint: {},
      layout: {
        'symbol-placement': 'line',
        'icon-image': 'car-15',
        'icon-rotate': -90,
        'icon-rotation-alignment': 'map',
        'icon-allow-overlap': true,
        'icon-ignore-placement': true
      }
    });
  }
}
