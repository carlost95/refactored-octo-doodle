import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'template-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() filtro = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  filtrar($event: KeyboardEvent): void {
    const value = ($event.target as HTMLInputElement).value;
    this.filtro.emit(value);
  }
}
