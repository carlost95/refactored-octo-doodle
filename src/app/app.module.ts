import {BasicAuthHtppInterceptorServiceService} from './service/basic-auth-htpp-interceptor-service.service';
import {VentasService} from './service/ventas.service';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MenuComponent} from './menu/menu.component';
import {ExcelExportService} from './service/excel-export.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {ConfirmModalComponent} from './shared/confirm-modal/confirm-modal.component';
import {SnackConfirmComponent} from './shared/snack-confirm/snack-confirm.component';
import {IndexComponent} from './index/index.component';
import {LoginComponent} from './auth/login.component';
import {LogoutComponent} from './auth/logout.component';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AppComponent,
    MenuComponent,
    LoginComponent,
    LogoutComponent,
    ConfirmModalComponent,
    SnackConfirmComponent,
    IndexComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, BrowserAnimationsModule, MaterialModule],
  providers: [
    VentasService,
    ExcelExportService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHtppInterceptorServiceService,
      multi: true,
    },
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
