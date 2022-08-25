import { MenuComponent } from './template/menu/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

import { PedidosComponent } from './pedidos/pedidos.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PaginacionPipe } from './paginacion.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../pages/compras/paginacion-es';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DropdownComponent } from './banco/dropdown/dropdown.component';
import { TemplatePageComponent } from './template/template-page/template-page.component';
import { HeaderComponent } from './template/header/header.component';
import { SearchComponent } from './template/search/search.component';
import { ButtonComponent } from './template/button/button.component';
import { MenuItemComponent } from './template/menu/menu-item/menu-item.component';

@NgModule({
  declarations: [
    PedidosComponent,
    AjustesComponent,
    ConfirmDialogComponent,
    PaginacionPipe,
    NavbarComponent,
    FooterComponent,
    DropdownComponent,
    TemplatePageComponent,
    HeaderComponent,
    SearchComponent,
    ButtonComponent,
    MenuItemComponent,
    MenuComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    PedidosComponent,
    AjustesComponent,
    NavbarComponent,
    DropdownComponent,
    TemplatePageComponent,
    MenuComponent,
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    },
  ],
})
export class SharedModule {}
