import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import icons from '@shared/icons/map-icons';
@Component({
  selector: 'template-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() title: string;
  @Input() icon: string;
  @Input() disabled = false;
  @Input() color = 'primary';
  @Output('onClick') clicked = new EventEmitter<boolean>();
  icons = icons;

  constructor() { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.clicked.emit(true);
  }
}
