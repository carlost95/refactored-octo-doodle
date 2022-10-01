import { Data } from '@angular/router';
import { ArticuloVenta } from './articulo-rest';
import { DatePipe } from '@angular/common';
export class Venta {
    idVenta?: number;
    idEmpresa?: number;
    idCliente?: number;
    idDireccion?: number;
    nombreCliente?: string;
    nroVenta?: string;
    fecha?: DatePipe;
    IVA?: number;
    descuento?: number;
    monto?: number;
    articulos?: ArticuloVenta[];
}
