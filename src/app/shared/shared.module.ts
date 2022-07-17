import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MaterialModule} from '../material/material.module';


import {PedidosComponent} from './pedidos/pedidos.component';
import {AjustesComponent} from './ajustes/ajustes.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {PaginacionPipe} from './paginacion.pipe';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {CustomMatPaginatorIntl} from '../pages/compras/paginacion-es';
import {MenuComponent} from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    PedidosComponent,
    AjustesComponent,
    ConfirmDialogComponent,
    PaginacionPipe,
    MenuComponent,
    FooterComponent],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [PedidosComponent, AjustesComponent, MenuComponent],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    }
  ],
})
export class SharedModule {
}
