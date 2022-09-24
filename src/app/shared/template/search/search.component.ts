import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'template-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('searcher') searcher: ElementRef;
  @Output() filtro = new EventEmitter<string>();
  value = 'searcher';

  constructor() { }

  ngOnInit(): void {
  }

  filtrar($event: KeyboardEvent): void {
    const value = ($event.target as HTMLInputElement).value;
    this.filtro.emit(value);
  }

  reset(): void {
    this.searcher.nativeElement.value = '';
  }
}
