import { ArticuloVenta, ArticuloRemito } from './articulo-rest';
import { Empresa } from './Empresa';
import { Direccion } from './Direccion';
import { Cliente } from './Cliente';

export class Remito {
    idRemito?: number;
    cliente?: Cliente;
    direccion?: Direccion;
    nroRemito?: number;
    fechaRemito?: Date;
    entregado?: boolean;
}
export class RemitoConsult {
    idRemito?: number;
    empresa?: Empresa;;
    cliente?: Cliente;
    direccion?: Direccion;
    nroRemito?: number;
    fechaRemito?: Date;
    articulos?: ArticuloRemito[];
}
