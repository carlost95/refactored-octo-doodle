import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-card-parada',
  templateUrl: './card-parada.component.html',
  styleUrls: ['./card-parada.component.scss']
})
export class CardParadaComponent implements OnInit {

  @Input() parada: any;
  @Input() disabled: boolean;
  @Output() agregarParada = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  agregar(): void {
    console.log(this.parada);
    this.agregarParada.emit(this.parada);
  }

}
