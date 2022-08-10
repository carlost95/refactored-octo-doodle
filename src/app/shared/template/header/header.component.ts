import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'template-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() backRoute: string;

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate([this.backRoute]);
  }
}
