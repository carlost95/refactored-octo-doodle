import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-menu-ventas',
  templateUrl: './sub-menu-ventas.component.html',
  styleUrls: ['./sub-menu-ventas.component.css']
})
export class SubMenuVentasComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  abmDepartamento(){
// this.router.navigate(["ventas/lista-departamentos"]);
// console.log("ir a departamento");

  }
}
