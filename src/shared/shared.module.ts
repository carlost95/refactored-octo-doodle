import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MaterialModule} from '../app/material/material.module';



@NgModule({
  declarations: [PedidosComponent, AjustesComponent, ConfirmDialogComponent],
  imports: [
    FormsModule,
    CommonModule, MaterialModule, ReactiveFormsModule
  ],
  exports: [PedidosComponent, AjustesComponent]
})
export class SharedModule { }
