import { Component, OnInit } from '@angular/core';
import {DepartamentosService} from "../../../service/departamentos.service";
import {Departamento} from "../../../models/Departamento";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AgregarClienteComponent} from "../../ventas/clientes/agregar-cliente/agregar-cliente.component";
import {AgregarDepartamentoComponent} from "../agregar-departamento/agregar-departamento.component";

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.scss']
})
export class DepartamentoComponent implements OnInit {

  departamentos: Departamento[];
  private update: Departamento;
  private consulting: boolean = false;

  constructor(
    private departamentoService: DepartamentosService,
    public matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.departamentoService.getAll().subscribe(resp => {
      this.departamentos = resp.data;
      console.log(resp.data)
    });
  }

  showModal(departamento: Departamento) {

  }

  nuevo() {
    this.consulting = false;
    this.openDialog()

  }

  consultar(departamento: Departamento) {

  }

  editar(departamento: Departamento) {

  }

  volver() {
    window.history.back()
  }


  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'modal-component';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = {
      departamentos: this.departamentos,
      departamento: this.update,
      consulting: this.consulting
    };
    const modalDialog = this.matDialog.open(AgregarDepartamentoComponent, dialogConfig);
    // modalDialog.afterClosed().subscribe(result => {
    //   if(result){
    //     this.openSnackBar();
    //   }
    //   this.getData();
    // })
  }


}
