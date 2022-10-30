import { MenuComponent } from './template/menu/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
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
import { RemitoModalComponent } from './remito-modal/remito-modal.component';
import { ReporteComponent } from './template/reporte/reporte.component';

@NgModule({
  declarations: [
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
    OnlyNumber,
    RemitoModalComponent,
    ReporteComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
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
    SearchComponent,
    ReporteComponent
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
    },
  ],
})
export class SharedModule {
}
