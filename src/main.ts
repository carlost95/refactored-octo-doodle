import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


Mapboxgl.accessToken = environment.apikey;

if (!navigator.geolocation) {
  alert('Este NAVEGADOR no soporta GEOLOCALIZACION');
  throw new Error('Geolocation is not supported by your browser');
}
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
