import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'template-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() items: any[];
  constructor() {}

  ngOnInit(): void {}
}
