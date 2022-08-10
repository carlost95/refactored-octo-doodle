import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.scss']
})
export class TemplatePageComponent implements OnInit {

  @Input() title: string;
  @Input() backRoute: string;
  @Output() filtro = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  filtrarTermino(value: string): void {
    this.filtro.emit(value);
  }

}
