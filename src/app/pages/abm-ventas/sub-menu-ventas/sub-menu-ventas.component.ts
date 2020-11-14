import {Component, OnInit} from '@angular/core';
import {TokenService} from '../../../service/token.service';

@Component({
  selector: 'app-sub-menu-ventas',
  templateUrl: './sub-menu-ventas.component.html',
  styleUrls: ['./sub-menu-ventas.component.css']
})
export class SubMenuVentasComponent implements OnInit {
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
