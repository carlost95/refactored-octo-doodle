import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosComponent } from './pedidos/pedidos.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [PedidosComponent, AjustesComponent, ConfirmDialogComponent],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [PedidosComponent]
})
export class SharedModule { }
