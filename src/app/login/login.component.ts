import { AutenticacionService } from './../service/autenticacion.service';
import { Router } from '@angular/router';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  nombreUsuario = "";
  password = "";
  loginInvalido = false;

  constructor(private router:Router, private autenticacion:AutenticacionService) {
  }

  ngOnInit() {}

  chequearLogueo(){

    (this.autenticacion.autenticacion(this.nombreUsuario, this.password).subscribe(
      data => {
        this.router.navigate(['']);
        this.loginInvalido = false
      },
      error => {
        this.loginInvalido = true

      }
    ));
  }

}
