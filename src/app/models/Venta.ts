import { ArticuloVenta } from './articulo-rest';
export class Venta {
    idVenta?: number;
    idEmpresa?: number;
    idCliente?: number;
    idDireccion?: number;
    nombreCliente?: string;
    nroVenta?: string;
    fecha?: Date;
    descuento?: number;
    total?: number;
    articulos?: ArticuloVenta[];
}
