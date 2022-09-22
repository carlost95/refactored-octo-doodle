import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logistica',
  templateUrl: './logistica.component.html',
  styleUrls: ['./logistica.component.css']
})
export class LogisticaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  validaMenu() {
    if (this.router.url.includes('/logistica')) {
      return false;
    } else {
      return true;
    }
  }

}
