import {Component, OnInit} from '@angular/core';
import {TokenService} from '../service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  isLogged = false;
  roles: string[];
  isAdmin: boolean;

  constructor(private tokenService: TokenService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
}
