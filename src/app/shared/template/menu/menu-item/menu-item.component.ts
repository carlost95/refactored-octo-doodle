import { Component, Input, OnInit } from '@angular/core';
import icons from '@shared/icons/map-icons';

@Component({
  selector: 'template-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  @Input() item: any;
  icons = icons;

  constructor() {}

  ngOnInit(): void {}
}
