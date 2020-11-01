import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { SeguridadComponent } from './seguridad.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { LogoutComponent } from './logout/logout.component';
import {MaterialModule} from '../../material/material.module';
import { ListUsersComponent } from './list-users/list-users.component';


@NgModule({
  declarations: [SeguridadComponent, SubMenuComponent, LogoutComponent, ListUsersComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule, FormsModule, MaterialModule, ReactiveFormsModule
  ]
})
export class SeguridadModule { }
