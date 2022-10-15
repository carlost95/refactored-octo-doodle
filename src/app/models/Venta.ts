import { ArticuloVenta } from './articulo-rest';
import { Empresa } from './Empresa';
import { Cliente } from '@models/Cliente';
import { Direccion } from './Direccion';
export class Venta {
    idVenta?: number;
    idEmpresa?: number;
    idCliente?: number;
    idDireccion?: number;
    nroVenta?: number;
    fechaVenta?: Date;
    descuento?: number;
    total?: number;
    articulos?: ArticuloVenta[];
}

export class VentaConsult {
    idVenta?: number;
    empresa?: Empresa;
    cliente?: Cliente;
    direccion?: Direccion;
    nombreCliente?: string;
    nroVenta?: number;
    fechaVenta?: Date;
    descuento?: number;
    total?: number;
    articulos?: ArticuloVenta[];
}
