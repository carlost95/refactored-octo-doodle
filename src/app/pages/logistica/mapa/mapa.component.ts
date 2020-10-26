import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})

export class MapaComponent implements OnInit {

  titlePage = 'localizacion';
  position = {
    lat: -29.169021199999996,
    lng: - 67.5112626
  };
  label = {
    color: 'black',
    text: 'ubicacion'
  };
  zoom = 16;

  constructor() { }

  ngOnInit() {
  }

}