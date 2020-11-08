import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import {logger} from "codelyzer/util/logger";

@Component({
  selector: "app-abm-ventas",
  templateUrl: "./abm-ventas.component.html",
  styleUrls: ["./abm-ventas.component.css"]
})
export class AbmVentasComponent implements OnInit {
  constructor(private router: Router) {}
  validMenu() {
    if (
      this.router.url.includes("/distritos") ||
      this.router.url.includes("/departamentos")
    )
      return false;
    else return true;
  }
  ngOnInit() {}
}
