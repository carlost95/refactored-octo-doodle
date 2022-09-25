import { MenuComponent } from './template/menu/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

import { PedidosComponent } from './pedidos/pedidos.component';
import { AjustesComponent } from './ajustes/ajustes.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
// import { PaginacionPipe } from './paginacion.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
// import { CustomMatPaginatorIntl } from '../pages/compras/paginacion-es';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { DropdownComponent } from './banco/dropdown/dropdown.component';
import { TemplatePageComponent } from './template/template-page/template-page.component';
import { HeaderComponent } from './template/header/header.component';
import { SearchComponent } from './template/search/search.component';
import { ButtonComponent } from './template/button/button.component';
import { MenuItemComponent } from './template/menu/menu-item/menu-item.component';
import { UnidadMedidaDropdownComponent } from './unidad-medida/unidad-medida-dropdown/unidad-medida-dropdown.component';
import { RubroDropdownComponent } from './rubro/dropdown/rubro-dropdown.component';
import { SubrubroDropdownComponent } from './subrubro/dropdown/subrubro-dropdown.component';
import { MarcaDropdownComponent } from './marca/dropdown/marca-dropdown.component';
import { ProveedorDropdownComponent } from './proveedor/dropdown/proveedor-dropdown.component';
import { DistritoDropdownComponent } from './distrito/dropdown/dropdown.component';
import { OnlyNumber } from './directives/only-numbers.directive';

@NgModule({
  declarations: [
    PedidosComponent,
    AjustesComponent,
    ConfirmDialogComponent,
    NavbarComponent,
    FooterComponent,
    DropdownComponent,
    TemplatePageComponent,
    HeaderComponent,
    SearchComponent,
    ButtonComponent,
    MenuItemComponent,
    MenuComponent,
    DropdownComponent,
    UnidadMedidaDropdownComponent,
    RubroDropdownComponent,
    SubrubroDropdownComponent,
    MarcaDropdownComponent,
    DistritoDropdownComponent,
    ProveedorDropdownComponent,
    OnlyNumber
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
    DropdownComponent,
    UnidadMedidaDropdownComponent,
    RubroDropdownComponent,
    SubrubroDropdownComponent,
    MarcaDropdownComponent,
    ProveedorDropdownComponent,
    DistritoDropdownComponent,
    HeaderComponent,
    OnlyNumber,
    SearchComponent
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
    },
  ],
})
export class SharedModule {
}
