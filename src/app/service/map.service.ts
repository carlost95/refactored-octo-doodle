import { Injectable } from '@angular/core';
import {
  AnySourceData,
  LngLatBounds,
  LngLatLike,
  Map,
  Marker,
  Popup
} from 'mapbox-gl';
import { Feature } from '../pages/logistica/interfaces/places';
import { DirectionsApiClient } from '../pages/logistica/api/directionsApiClient';
import { DirectionsResponse, Route } from '../pages/logistica/interfaces/directions';


@Injectable({
  providedIn: 'root',
})

export class MapService {
  private map?: Map;
  private markers: Marker[] = [];

  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }
  //TODO: Se define los parametros para inicializar mapa
  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw new Error('El mapa no esta inicailizado');
    // TODO: se define en centro del mapa con las coordenadas recibidas



    this.map?.flyTo({
      zoom: 14,
      center: coords,
    });
  }
  // createMarker(ubication: [number, number]) {
  //   if (!this.map) throw new Error("Mapa no inicializado");
  //   this.markers.forEach((marker) => marker.remove());
  //   const newMarkers = [];
  //   const newMarker = new Marker()
  //     .setLngLat(ubication)
  //     .addTo(this.map);
  //   newMarkers.push(newMarker);
  //   this.markers = newMarkers;

  // }
  // createMarkerFromPlaces(places: Feature[], userLocation: [number, number]) {
  //   if (!this.map) throw new Error("Mapa no inicializado");
  //   this.markers.forEach((marker) => marker.remove());
  //   const newMarkers = [];
  //   for (const place of places) {
  //     const [lng, lat] = place.center;
  //     const popup = new Popup().setHTML(`<h6>${place.text}</h6>
  //     <span> ${place.place_name}</span>`);
  //     const newMarker = new Marker()
  //       .setLngLat([lng, lat])
  //       .setPopup(popup)
  //       .addTo(this.map);
  //     newMarkers.push(newMarker);
  //   }
  //   this.markers = newMarkers;
  //   if (places.length === 0) return;

  //   // Limites del mapa
  //   const bounds = new LngLatBounds();
  //   newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
  //   bounds.extend(userLocation);

  //   this.map.fitBounds(bounds, {
  //     padding: 150,
  //   });
  // }
  // getRouteBeetwenPoints(origin: [number, number], destination: [number, number]) {
  //   this.directionsApi.get<DirectionsResponse>(`/${origin.join(',')};${destination.join(',')}`).subscribe(resp =>
  //     this.drawPolyline(resp.routes[0]));
  // }

  // private drawPolyline(route: Route) {
  //   console.log({ KMs: route.distance / 1000, Duracion: route.duration / 60 });
  //   if (!this.map) throw new Error("Mapa no inicializado");

  //   const coords = route.geometry.coordinates;

  //   const bounds = new LngLatBounds();
  //   coords.forEach(([lng, lat]) => { bounds.extend([lng, lat]) });

  //   this.map?.fitBounds(bounds, {
  //     padding: 150,
  //   })

  //   const sourceDate: AnySourceData = {
  //     type: 'geojson',
  //     data: {
  //       type: 'FeatureCollection',
  //       features: [{
  //         type: 'Feature',
  //         properties: {},
  //         geometry: {
  //           type: 'LineString',
  //           coordinates: coords
  //         }
  //       }],
  //     }
  //   }
  //   if (this.map.getLayer('RouteString')) {
  //     this.map.removeLayer('RouteString');
  //     this.map.removeSource('RouteString');

  //   }
  //   this.map.addSource('RouteString', sourceDate);
  //   this.map.addLayer({
  //     id: 'RouteString',
  //     type: 'line',
  //     source: 'RouteString',
  //     layout: {
  //       "line-cap": "round",
  //       "line-join": "round"
  //     },
  //     paint: {
  //       "line-color": "green",
  //       "line-width": 3
  //     }
  //   });
  // }
}