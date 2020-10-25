import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PedidosComponent} from './pedidos/pedidos.component';
import {AjustesComponent} from './ajustes/ajustes.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {MaterialModule} from '../material/material.module';
import {PaginacionPipe} from './paginacion.pipe';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {CustomMatPaginatorIntl} from '../compras/paginacion-es';


@NgModule({
  declarations: [PedidosComponent, AjustesComponent, ConfirmDialogComponent, PaginacionPipe],
  imports: [
    FormsModule,
    CommonModule, MaterialModule, ReactiveFormsModule
  ],
  exports: [PedidosComponent, AjustesComponent],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    }
  ],
})
export class SharedModule {
}
