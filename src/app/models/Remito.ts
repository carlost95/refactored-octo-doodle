import { ArticuloVenta, ArticuloRemito } from './articulo-rest';
import { Empresa } from './Empresa';
import { Direccion } from './Direccion';
import { Cliente } from './Cliente';

export class Remito {
    idRemito?: number;
    empresa?: Empresa;;
    cliente?: Cliente;
    direccion?: Direccion;
    nroRemito?: number;
    fechaVenta?: Date;
}
export class RemitoConsult {
    idRemito?: number;
    empresa?: Empresa;;
    cliente?: Cliente;
    direccion?: Direccion;
    nroRemito?: number;
    fechaVenta?: Date;
    articulos?: ArticuloRemito[];
}
