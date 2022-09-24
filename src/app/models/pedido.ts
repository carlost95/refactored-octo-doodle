import {ArticuloStock} from '@models/articulo-rest';

export class Pedido {
  idPedido?: number;
  nombre?: string;
  descripcion?: string;
  fecha?: Date;
  habilitado?: boolean;
  idProveedor?: number;
  articulos?: ArticuloStock[];
}
