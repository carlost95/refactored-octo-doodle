import { Component, } from '@angular/core';
import { PlaceService } from '../../../../service/place.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screen-map',
  templateUrl: './screen-map.component.html',
  styleUrls: ['./screen-map.component.scss']
})
export class ScreenMapComponent {

  constructor(private placeService: PlaceService) { }

  get isUserLocationReady() {
    return this.placeService.isUserLocationReady;
  }


}
