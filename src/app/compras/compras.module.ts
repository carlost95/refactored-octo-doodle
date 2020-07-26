import { FormsModule } from "@angular/forms";
import { ComprasComponent } from "./compras.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";

import { ComprasRoutingModule } from "./compras-routing.module";
import { SubMenuComponent } from "./sub-menu/sub-menu.component";
import { ListarProveedorComponent } from "./listar-proveedor/listar-proveedor.component";
import { ListarArticulosComponent } from "./listar-articulos/listar-articulos.component";
import { AgregarProveedorComponent } from "./agregar-proveedor/agregar-proveedor.component";
import { ModificarArticuloComponent } from "./modificar-articulo/modificar-articulo.component";
import { AgregarArticuloComponent } from "./agregar-articulo/agregar-articulo.component";
import { ListarPedidoComponent } from "./listar-pedido/listar-pedido.component";
import { AgregarPedidoComponent } from "./agregar-pedido/agregar-pedido.component";
import { ConsultarPedidoComponent } from "./consultar-pedido/consultar-pedido.component";
import { ExcelExportService } from "../service/excel-export.service";

@NgModule({
  declarations: [
    SubMenuComponent,
    ComprasComponent,
    ListarProveedorComponent,
    ListarArticulosComponent,
    AgregarProveedorComponent,
    ModificarArticuloComponent,
    AgregarArticuloComponent,
    ListarPedidoComponent,
    AgregarPedidoComponent,
    ConsultarPedidoComponent,
    // ListarPreciosComponent,
    // ListarRubroComponent,
    // ListarSubrubroComponent
  ],
  imports: [CommonModule, ComprasRoutingModule, FormsModule, SharedModule],
  providers: [ExcelExportService],
})
export class ComprasModule {}
