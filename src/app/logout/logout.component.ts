import { AutenticacionService } from './../service/autenticacion.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router:Router, private autenticacion:AutenticacionService) {}

  ngOnInit() {
    this.autenticacion.logOut();
    this.router.navigate(['login']);
  }
}
