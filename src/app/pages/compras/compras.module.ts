import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComprasComponent } from './compras.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { ComprasRoutingModule } from './compras-routing.module';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { ListarProveedorComponent } from './proveedores/listar-proveedor/listar-proveedor.component';
import { ListarArticulosComponent } from './articulos/listar-articulos/listar-articulos.component';
import { AgregarProveedorComponent } from './proveedores/agregar-proveedor/agregar-proveedor.component';
import { AgregarArticuloComponent } from './articulos/agregar-articulo/agregar-articulo.component';
import { ListarPedidoComponent } from './pedidos/listar-pedido/listar-pedido.component';
import { AgregarPedidoComponent } from './pedidos/agregar-pedido/agregar-pedido.component';
import { ConsultarPedidoComponent } from './pedidos/consultar-pedido/consultar-pedido.component';
import { ListarCuentasComponent } from './cuentas/listar-cuentas/listar-cuentas.component';
import { AgregarCuentaComponent } from './cuentas/agregar-cuenta/agregar-cuenta.component';
import { ExcelExportService } from '../../service/excel-export.service';
import { AbmComprasModule } from '../abm-compras/abm-compras.module';
import { MaterialModule } from '../../material/material.module';
import { PaginacionPipe } from './paginacion.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './paginacion-es';
import { interceptorProvider } from '../../interceptors/prod-interceptor.service';

@NgModule({
  declarations: [
    SubMenuComponent,
    ComprasComponent,
    ListarProveedorComponent,
    ListarArticulosComponent,
    ListarPedidoComponent,
    AgregarProveedorComponent,
    AgregarPedidoComponent,
    AgregarArticuloComponent,
    ConsultarPedidoComponent,
    PaginacionPipe,
    ListarCuentasComponent,
    AgregarCuentaComponent,
  ],
  imports: [
    CommonModule,
    ComprasRoutingModule,
    FormsModule,
    SharedModule,
    AbmComprasModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
    ExcelExportService,
    interceptorProvider,
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    },
  ],
})
export class ComprasModule {}
