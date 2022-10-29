import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-parada',
  templateUrl: './card-parada.component.html',
  styleUrls: ['./card-parada.component.scss']
})
export class CardParadaComponent {

  @Input() parada: any;
  @Input() disabled: boolean;
  @Output() agregarParada = new EventEmitter<any>();

  agregar(): void {
    this.agregarParada.emit(this.parada);
  }

}
