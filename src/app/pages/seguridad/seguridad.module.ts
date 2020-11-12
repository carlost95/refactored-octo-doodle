import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { SeguridadComponent } from './seguridad.component';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { RegisterComponent } from './register/register.component';
import {MaterialModule} from '../../material/material.module';
import { ListUsersComponent } from './list-users/list-users.component';


@NgModule({
  declarations: [SeguridadComponent, SubMenuComponent, RegisterComponent, ListUsersComponent],
  imports: [
    CommonModule,
    SeguridadRoutingModule, FormsModule, MaterialModule, ReactiveFormsModule
  ]
})
export class SeguridadModule { }
