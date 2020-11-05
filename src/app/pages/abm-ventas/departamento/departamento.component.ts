import { Component, OnInit } from '@angular/core';
import {DepartamentosService} from "../../../service/departamentos.service";
import {Departamento} from "../../../models/Departamento";

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {

  departamentos: Departamento[];

  constructor(
    private departamentoService: DepartamentosService
  ) { }

  ngOnInit(): void {
    this.departamentoService.getAll().subscribe(resp => {
      this.departamentos = resp.data;
      console.log(resp.data)
    });
  }

  showModal(departamento: Departamento) {

  }

  consultar(departamento: Departamento) {

  }

  editar(departamento: Departamento) {
    
  }
}
