import { BasicAuthHtppInterceptorServiceService } from "./service/basic-auth-htpp-interceptor-service.service";
import { VentasService } from "./service/ventas.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MenuComponent } from "./menu/menu.component";
import { LoginComponent } from "./pages/login/login.component";
import { LogoutComponent } from "./pages/logout/logout.component";
import { ExcelExportService } from "./service/excel-export.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import { ConfirmModalComponent } from './shared/confirm-modal/confirm-modal.component';
import { SnackConfirmComponent } from './shared/snack-confirm/snack-confirm.component';
import { RegsitroComponent } from './auth/regsitro.component';
import { IndexComponent } from './index/index.component';
// import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
@NgModule({
  declarations: [AppComponent, MenuComponent, LoginComponent, LogoutComponent, ConfirmModalComponent, SnackConfirmComponent, RegsitroComponent, IndexComponent],
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
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
