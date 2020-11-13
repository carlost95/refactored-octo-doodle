import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'app-sub-menu-compras',
  templateUrl: './sub-menu-compras.component.html',
  styleUrls: ['./sub-menu-compras.component.css']
})
export class SubMenuComprasComponent implements OnInit {
  isLogged = false;

  constructor(private tokenService: TokenService) {
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }


}
