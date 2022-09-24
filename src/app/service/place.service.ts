import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  public userLocation?: [number, number];

  constructor() {
    this.getUserLocation();
  }

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
        (err) => {
          alert('Geolocation is not available')
          console.log("error", err);
          reject();
        }
      ));
  }
  setLocation(ubicacion: [number, number]) {
    this.userLocation = ubicacion;
  }
}
