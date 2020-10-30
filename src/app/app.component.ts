import {Component, OnInit} from '@angular/core';
import {TokenService} from './service/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLogged = false;

  constructor(private tokenService: TokenService) {
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnInit() {
    if (this.tokenService.getToken()) {
      console.log(this.tokenService.getToken());
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  // tslint:disable-next-line:typedef
  validateLogin($event) {
    this.isLogged = $event;
  }

}
