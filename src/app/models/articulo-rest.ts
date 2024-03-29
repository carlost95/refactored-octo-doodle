export class ArticuloRest {
  id?: number;
  nombre?: string;
  abreviatura?: string;
  codigoArt?: string;
  stockMin?: number;
  stockMax?: number;
  costo?: number;
  precio?: number;
  habilitado?: boolean;
  idProveedor?: number;
  idUnidadMedida?: number;
  idMarca?: number;
  idRubro?: number;
  idSubRubro?: number;
  unidadMedidaNombre?: string;
  rubroNombre?: string;

}

export class ArticuloStock {
  id?: number;
  nombre?: string;
  codigoArt?: string;
  idProveedor?: number;
  stockActual?: number;
  cantidad?: number;
  stockFinal?: number;
}
// TODO: agregar el stck al articulo venta
export class ArticuloVenta {
  idArticulo?: number;
  nombre?: string;
  codigoArticulo?: string;
  cantidad?: number;
  precio?: number;
  stock?: number;
  subTotal?: number;
}

export class ArticuloRemito {
  idArticulo?: number;
  codigoArticulo?: string;
  nombre?: string;
  cantidad?: number;
}