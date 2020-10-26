import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { SeguridadComponent } from './seguridad.component';
import { SubMenuSeguridadComponent } from './sub-menu-seguridad/sub-menu-seguridad.component';


@NgModule({
  declarations: [SeguridadComponent, SubMenuSeguridadComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule, FormsModule
  ]
})
export class SeguridadModule { }
