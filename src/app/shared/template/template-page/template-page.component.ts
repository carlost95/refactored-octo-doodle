import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'template-page',
  templateUrl: './template-page.component.html',
  styleUrls: ['./template-page.component.scss']
})
export class TemplatePageComponent implements OnInit {

  @Input() title: string;
  @Input() backRoute: string;
  @Input() titleButton: string;
  @Input() iconButton: string;
  @Input() showButton: boolean;
  @Output() filtro = new EventEmitter<string>();
  @Output('onClickButton') clicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  filtrarTermino(value: string): void {
    this.filtro.emit(value);
  }

  onClickButton($event: boolean) {
    this.clicked.emit($event);
  }
}
