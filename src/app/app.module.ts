import {VentasService} from './service/ventas.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MenuComponent} from './menu/menu.component';
import {ExcelExportService} from './service/excel-export.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {ConfirmModalComponent} from './shared/confirm-modal/confirm-modal.component';
import {SnackConfirmComponent} from './shared/snack-confirm/snack-confirm.component';
import {IndexComponent} from './index/index.component';
import {LoginComponent} from './auth/login.component';
import {interceptorProvider} from './interceptors/prod-interceptor.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AppComponent,
    MenuComponent,
    LoginComponent,
    ConfirmModalComponent,
    SnackConfirmComponent,
    IndexComponent,
    ResetPasswordComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, BrowserAnimationsModule, MaterialModule, ReactiveFormsModule],
  providers: [
    VentasService,
    ExcelExportService,
    interceptorProvider,
  ],
  exports: [
    MenuComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
