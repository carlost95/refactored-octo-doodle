import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css']
})
export class SeguridadComponent implements OnInit {

  constructor(private router: Router) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  validaMenu() {
    if (this.router.url.includes('/list-users') ||
      this.router.url.includes('/logout') ||
      this.router.url.includes('/roles')) {
      return false;
    } else {
      return true;
    }
  }
}
