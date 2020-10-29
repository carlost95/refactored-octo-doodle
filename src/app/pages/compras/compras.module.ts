import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ComprasComponent} from './compras.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../../shared/shared.module';

import {ComprasRoutingModule} from './compras-routing.module';
import {SubMenuComponent} from './sub-menu/sub-menu.component';
import {ListarProveedorComponent} from './listar-proveedor/listar-proveedor.component';
import {ListarArticulosComponent} from './listar-articulos/listar-articulos.component';
import {AgregarProveedorComponent} from './agregar-proveedor/agregar-proveedor.component';
import {AgregarArticuloComponent} from './agregar-articulo/agregar-articulo.component';
import {ListarPedidoComponent} from './listar-pedido/listar-pedido.component';
import {AgregarPedidoComponent} from './agregar-pedido/agregar-pedido.component';
import {ConsultarPedidoComponent} from './consultar-pedido/consultar-pedido.component';
import {ExcelExportService} from '../../service/excel-export.service';
import {AbmComprasModule} from '../abm-compras/abm-compras.module';
import {MaterialModule} from '../../material/material.module';
import {PaginacionPipe} from './paginacion.pipe';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {CustomMatPaginatorIntl} from './paginacion-es';
import {AppModule} from '../../app.module';


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
  ],
  imports: [CommonModule, ComprasRoutingModule, FormsModule, SharedModule,
    AbmComprasModule, MaterialModule, ReactiveFormsModule, AppModule],
  providers: [ExcelExportService,
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl
    }
  ],
})
export class ComprasModule {
}
