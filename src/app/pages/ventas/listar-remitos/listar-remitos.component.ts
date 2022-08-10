import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listar-remitos',
  templateUrl: './listar-remitos.component.html',
  styleUrls: ['./listar-remitos.component.scss']
})
export class ListarRemitosComponent implements OnInit {

  lista = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  constructor() { }

  ngOnInit(): void {
  }

  filtrarRemitos(value: string): void {
    if (value.length > 0) {
      this.lista = this.lista.filter(item => item.includes(value));
    } else {
      this.lista = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    }
    console.log(this.lista);
  }
}
